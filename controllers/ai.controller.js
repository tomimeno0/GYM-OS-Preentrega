import { env } from '../config/env.js';
import { IAService } from '../models/uml.model.js';
import { dto, readFitness, writeFitness } from './domain.controller.js';
import { AppError, assert } from './errors.controller.js';
import { models } from '../models/index.js';
import { cohereChat } from './cohere.controller.js';
const { usuarios: Users, conversaciones: Conversations, mensajes: Messages } = models;

export const chatJsonSchema = {
  type: 'object',
  required: ['relacionado', 'respuesta'],
  properties: {
    relacionado: {
      type: 'boolean',
      description:
        'True para consultas de entrenamiento, hábitos o GYM-OS y para saludos, agradecimientos y continuaciones de la conversación. False solo para solicitudes claramente ajenas.',
    },
    respuesta: { type: 'string' },
  },
};

const outOfScopeResponse =
  'Puedo ayudarte con entrenamiento, hábitos y el uso de GYM-OS. ¿Querés que veamos alguna de esas opciones?';
const previousOutOfScopeResponse =
  'Solo puedo ayudarte con GYM—OS, entrenamiento, hábitos y nutrición general.';

function chatInstructions(mode) {
  return `Sos el asistente de GYM-OS. Conversá en español rioplatense, con naturalidad y de forma útil.
Tu modo es ${mode === 'soporte' ? 'soporte de la aplicación' : 'orientación general de entrenamiento'}.
Devolvé únicamente un objeto JSON con relacionado (booleano) y respuesta (texto).

Alcance y conversación:
- relacionado=true para ejercicio, hábitos y uso de GYM-OS. También para saludos, agradecimientos, despedidas y preguntas sobre qué podés hacer.
- "hola", "buenas", "holaa", "gracias", "sí", "dale", "ok", "contame", "¿y eso?" y otras continuaciones breves forman parte de la conversación. Usá el historial para interpretarlas; si falta contexto, hacé una pregunta breve. No las rechaces por no mencionar el gimnasio.
- Un saludo solo inicia la charla: saludá y preguntá en qué podés ayudar, sin repetir límites ni dar un discurso.
- relacionado=false solo si el pedido concreto es claramente ajeno, por ejemplo inversiones, política o programación ajena a la aplicación. Si un saludo acompaña un pedido ajeno ("hola, qué criptomoneda compro"), sigue siendo ajeno.
- Si una respuesta anterior rechazó un saludo, corregí ese trato y retomá la charla; no repitas el rechazo.

Qué existe en esta preentrega:
- Mi cuenta (/me) permite editar datos y activar o revocar el consentimiento para compartir consultas con Cohere.
- Mi progreso (/progreso) permite registrar medidas y consultar su evolución. Objetivos (/objetivos) permite definir, completar y dar de baja una meta.
- Mis rutinas (/rutinas) permite crear y editar rutinas manuales. Crear rutina abre el editor: nombre, objetivo opcional y ejercicios por día con series, repeticiones, carga y descanso; Guardar rutina confirma la carga. Explorar ejercicios (/ejercicios) ofrece el catálogo.
- Desde el detalle de una rutina se elige un día y Comenzar entrenamiento. Entrenamientos (/entrenamientos) muestra sesiones e historial; se puede guardar avance y completar una sesión.
- Este chat conserva conversaciones y ofrece los modos Entrenador y Soporte. No hay nutrición, administración ni generación/adaptación automática de planes persistidos en esta versión.
- Podés orientar sobre entrenamiento en el chat, pero no guardás ni modificás una rutina por conversar. Para guardar una, indicá el editor manual. No afirmes que hiciste una acción que no ejecutaste.

Calidad y seguridad:
- Contestá la consulta concreta. Para empezar a entrenar, preguntá por experiencia, días disponibles y equipo antes de personalizar. No inventes esos datos.
- Solo recibís esta conversación: no afirmes conocer medidas, rutinas o progreso que el usuario no haya mencionado en ella.
- No diagnostiques ni indiques tratamientos. Si el usuario menciona dolor o una lesión, priorizá detener la actividad que lo provoca y consultar a un profesional.
- Usá texto simple, párrafos cortos o pasos numerados; sin tablas ni marcas Markdown. En general, respondé en menos de 160 palabras. No repitas aclaraciones o preguntas que el historial ya resolvió.`;
}

async function structuredChat(messages) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const answer = JSON.parse(await cohereChat(messages, chatJsonSchema));
      assert(
        typeof answer.relacionado === 'boolean' &&
          typeof answer.respuesta === 'string' &&
          answer.respuesta.trim(),
        503,
        'AI_INVALID_RESPONSE',
        'El asistente devolvió una respuesta inválida. Intentá nuevamente.',
      );
      return answer;
    } catch (error) {
      if (error instanceof AppError && error.code !== 'AI_INVALID_RESPONSE') throw error;
      if (attempt === 1)
        throw new AppError(
          503,
          'AI_INVALID_RESPONSE',
          'El asistente devolvió una respuesta inválida. Intentá nuevamente.',
        );
    }
  }
}

const requireAiConsent = (user) =>
  assert(
    user?.consentimiento_ia === true,
    403,
    'AI_CONSENT_REQUIRED',
    'Activá el consentimiento de IA desde tu perfil antes de compartir datos con el proveedor.',
  );

const ensureAiConsent = (userId) =>
  readFitness(userId, async (transaction) => {
    const user = await Users.findByPk(userId, {
      attributes: ['id', 'consentimiento_ia'],
      transaction,
    });
    requireAiConsent(user);
  });

export const listConversations = (userId) =>
  readFitness(userId, async (transaction) => ({
    items: dto(
      await Conversations.findAll({
        where: { usuario_id: userId },
        order: [['fecha_creacion', 'DESC']],
        transaction,
      }),
    ),
  }));

export const getConversation = (userId, id) =>
  readFitness(userId, async (transaction) => {
    const conversation = await Conversations.findOne({
      where: { id, usuario_id: userId },
      transaction,
    });
    assert(conversation, 404, 'NOT_FOUND', 'No se encontró la conversación.');
    const messages = await Messages.findAll({
      where: { conversacion_id: id },
      order: [['fecha_creacion', 'ASC']],
      transaction,
    });
    return { ...dto(conversation), mensajes: dto(messages) };
  });

export const chat = (userId, input) =>
  new IAService(
    {},
    {
      responderconsulta: () =>
        new IAService(
          {},
          {
            responderConsulta: async () => {
              await ensureAiConsent(userId);
              let previous = [];
              if (input.conversacion_id) {
                const conversation = await getConversation(userId, input.conversacion_id);
                assert(
                  conversation.modo === input.modo,
                  400,
                  'CONVERSATION_MODE',
                  'El modo no coincide con la conversación.',
                );
                previous = conversation.mensajes.slice(-10).map((m) => ({
                  role: m.rol,
                  content:
                    m.rol === 'assistant'
                      ? JSON.stringify({
                          relacionado: ![outOfScopeResponse, previousOutOfScopeResponse].includes(
                            m.contenido,
                          ),
                          respuesta: m.contenido,
                        })
                      : m.contenido,
                }));
              }
              let answer;
              try {
                answer = env.ai.mock
                  ? {
                      relacionado: !/bitcoin|criptomoneda|pol[ií]tica/i.test(input.consulta),
                      respuesta:
                        'Puedo ayudarte con entrenamiento, nutrición orientativa y el uso de GYM-OS.',
                    }
                  : await structuredChat([
                      {
                        role: 'system',
                        content: chatInstructions(input.modo),
                      },
                      ...previous,
                      { role: 'user', content: input.consulta },
                    ]);
              } catch (error) {
                if (error instanceof AppError) throw error;
                throw new AppError(
                  503,
                  'AI_INVALID_RESPONSE',
                  'El asistente devolvió una respuesta inválida. Intentá nuevamente.',
                );
              }
              assert(
                typeof answer.respuesta === 'string' && answer.respuesta.trim(),
                503,
                'AI_INVALID_RESPONSE',
                'El asistente devolvió una respuesta inválida.',
              );
              const responseText =
                answer.relacionado === true ? answer.respuesta.trim() : outOfScopeResponse;
              return writeFitness(userId, 'CU031_ASISTENTE_IA', 'ia', async (transaction) => {
                const messageTime = Date.now();
                let conversation;
                if (input.conversacion_id) {
                  conversation = await Conversations.findOne({
                    where: { id: input.conversacion_id, usuario_id: userId },
                    transaction,
                  });
                  assert(conversation, 404, 'NOT_FOUND', 'No se encontró la conversación.');
                } else {
                  conversation = await Conversations.create(
                    {
                      usuario_id: userId,
                      modo: input.modo,
                      titulo: input.consulta.slice(0, 100),
                      fecha_creacion: new Date(),
                    },
                    { transaction },
                  );
                }
                await Messages.bulkCreate(
                  [
                    {
                      conversacion_id: conversation.id,
                      rol: 'user',
                      contenido: input.consulta,
                      fecha_creacion: new Date(messageTime),
                    },
                    {
                      conversacion_id: conversation.id,
                      rol: 'assistant',
                      contenido: responseText,
                      fecha_creacion: new Date(messageTime + 1),
                    },
                  ],
                  { transaction },
                );
                const mensajes = await Messages.findAll({
                  where: { conversacion_id: conversation.id },
                  order: [['fecha_creacion', 'ASC']],
                  transaction,
                });
                return { ...dto(conversation), mensajes: dto(mensajes) };
              });
            },
          },
        ).responderConsulta(),
    },
  ).responderconsulta();

let healthCache;
export async function aiStatus() {
  if (env.ai.mock)
    return {
      proveedor: env.ai.provider,
      modelo: env.ai.model,
      configurado: true,
      disponible: true,
      modo_prueba: true,
      verificado_en: new Date().toISOString(),
    };
  if (!env.ai.apiKey)
    return {
      proveedor: env.ai.provider,
      modelo: env.ai.model,
      configurado: false,
      disponible: false,
      modo_prueba: false,
      verificado_en: null,
    };
  if (
    healthCache &&
    Date.now() - healthCache.at < (healthCache.value.disponible ? 5 * 60000 : 15000)
  )
    return healthCache.value;
  let disponible = false;
  try {
    const value = JSON.parse(
      await cohereChat(
        [
          { role: 'system', content: 'Respondé únicamente el JSON solicitado.' },
          { role: 'user', content: 'Confirmá disponibilidad.' },
        ],
        {
          type: 'object',
          required: ['ok'],
          properties: { ok: { type: 'boolean' } },
        },
      ),
    );
    disponible = value.ok === true;
  } catch {
    disponible = false;
  }
  const value = {
    proveedor: env.ai.provider,
    modelo: env.ai.model,
    configurado: true,
    disponible,
    modo_prueba: false,
    verificado_en: new Date().toISOString(),
  };
  healthCache = { at: Date.now(), value };
  return value;
}
