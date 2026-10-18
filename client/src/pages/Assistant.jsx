import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Send } from 'lucide-react';
import { api, useAction, useAuth, useResource } from '../lib';
import {
  Badge,
  Button,
  Confirm,
  Feedback,
  PageTitle,
  Resource,
  Select,
  Textarea,
} from '../components/ui';

function Chat({ enabled }) {
  const conversations = useResource('/ai/conversations');
  const [conversation, setConversation] = useState(null);
  const [mode, setMode] = useState('entrenador');
  const [question, setQuestion] = useState('');
  const action = useAction();
  function open(id) {
    return action.run(async () => {
      const value = await api(`/ai/conversations/${id}`);
      setConversation(value);
      setMode(value.modo);
    });
  }
  return (
    <section className="card ai-chat">
      <div className="section-title">
        <div>
          <p className="eyebrow">CU031 · ASISTENTE</p>
          <h2>Consultá y seguí la conversación.</h2>
        </div>
        <Button
          variant="secondary"
          disabled={action.busy}
          onClick={() => {
            setConversation(null);
            setQuestion('');
            action.setError(null);
          }}
        >
          Nueva conversación
        </Button>
      </div>
      <div className="ai-chat-layout">
        <aside className="ai-history" aria-label="Conversaciones anteriores">
          <strong>Historial</strong>
          <Resource resource={conversations}>
            {(data) =>
              data.items.length ? (
                data.items.map((item) => (
                  <button
                    key={item.id}
                    disabled={action.busy}
                    className={conversation?.id === item.id ? 'active' : ''}
                    onClick={() => open(item.id)}
                  >
                    <span>{item.titulo}</span>
                    <small>{item.modo}</small>
                  </button>
                ))
              ) : (
                <p className="small muted">Todavía no hay conversaciones.</p>
              )
            }
          </Resource>
        </aside>
        <div className="ai-thread">
          <div className="ai-messages" aria-live="polite">
            {conversation?.mensajes?.length ? (
              conversation.mensajes.map((message) => (
                <div key={message.id} className={`ai-message ${message.rol}`}>
                  <small>{message.rol === 'user' ? 'Vos' : 'GYM—OS'}</small>
                  <p>{message.contenido}</p>
                </div>
              ))
            ) : (
              <div className="ai-welcome">
                <Bot size={30} />
                <h3>¿En qué te ayudo?</h3>
                <p>Preguntá sobre tu entrenamiento, hábitos o el uso de GYM—OS.</p>
              </div>
            )}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              action.run(async () => {
                const result = await api('/ai/chat', {
                  ...(conversation ? { conversacion_id: conversation.id } : {}),
                  modo: mode,
                  consulta: question,
                });
                setConversation(result);
                setQuestion('');
                conversations.reload();
              });
            }}
          >
            <Select
              label="Modo"
              value={mode}
              disabled={!enabled || action.busy || Boolean(conversation)}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="entrenador">Entrenador</option>
              <option value="soporte">Soporte de la aplicación</option>
            </Select>
            <Textarea
              label="Tu consulta"
              required
              minLength={1}
              maxLength={2000}
              value={question}
              disabled={!enabled || action.busy}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Feedback {...action} />
            <Button type="submit" busy={action.busy} disabled={!enabled || !question.trim()}>
              <Send size={17} />
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Assistant() {
  const { user } = useAuth();
  const status = useResource('/ai/status');
  const enabled = Boolean(user.consentimiento_ia && status.data?.disponible);
  return (
    <>
      <PageTitle
        eyebrow="ASISTENCIA PERSONAL"
        title="Consultá al asistente."
        description="Chat con Cohere e historial. Esta preentrega no genera ni adapta planes."
      >
        {status.data && (
          <Badge tone={status.data.disponible ? 'green' : ''}>
            {status.data.modo_prueba
              ? 'SIMULACIÓN DE PRUEBA'
              : status.data.disponible
                ? 'DISPONIBLE'
                : 'NO DISPONIBLE'}
          </Badge>
        )}
      </PageTitle>
      {status.data?.modo_prueba && (
        <div className="notice" role="status">
          Esta instancia usa respuestas simuladas para diagnóstico. No está consultando Cohere.
        </div>
      )}
      <Resource resource={status}>
        {(state) =>
          !state.disponible && (
            <div className="notice error">
              El servicio de IA no está disponible en este momento. Las funciones manuales siguen
              disponibles.
            </div>
          )
        }
      </Resource>
      {!user.consentimiento_ia && (
        <div className="notice" role="status">
          <span>
            Para usar la IA, primero leé y activá el consentimiento en{' '}
            <Link to="/me">tu perfil</Link>. Las funciones manuales no comparten datos con Cohere.
          </span>
        </div>
      )}
      <Chat enabled={enabled} />
      <p className="small muted ai-disclaimer">
        La IA brinda orientación general. No reemplaza una evaluación médica, nutricional ni
        profesional.
      </p>
    </>
  );
}
