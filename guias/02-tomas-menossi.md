# Tomás Menossi: Chat con inteligencia artificial

Guía exclusiva de la **preentrega**, no de todas las funciones del proyecto final. Es una asignación de estudio y revisión; no afirma autoría histórica. El código se preparó con asistencia de Codex.

## Tu funcionalidad

**Casos:** CU031. **Pantallas:** `/asistente y consentimiento en /me`.

Tu bloque es IA y no se suma otra funcionalidad. No necesitás explicar entrenamiento de modelos ni todo el sistema. Esta versión solo conversa: no genera/adapta rutinas o dietas.

## Archivos que tenés que ubicar

- [client/src/pages/Assistant.jsx](../client/src/pages/Assistant.jsx).
- [controllers/ai.controller.js](../controllers/ai.controller.js).
- [controllers/cohere.controller.js](../controllers/cohere.controller.js).
- [config/env.js](../config/env.js).
- [routes/fitness.routes.js](../routes/fitness.routes.js).

## Qué hace cada función importante

| Función                                                  | Para qué sirve                                                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Chat](../client/src/pages/Assistant.jsx#L7)             | Envía consultas, bloquea cambios mientras espera y abre conversaciones anteriores.                                       |
| [chatInstructions](../controllers/ai.controller.js#L27)  | Define alcance, trato de saludos y continuaciones, funciones reales de esta versión y límites de seguridad.              |
| [chat](../controllers/ai.controller.js#L122)             | Comprueba consentimiento y propiedad de la conversación; prepara historial y guarda pregunta/respuesta juntas.           |
| [structuredChat](../controllers/ai.controller.js#L54)    | Interpreta JSON y valida relacionado/respuesta; permite repetir una salida inválida sin guardado parcial.                |
| [cohereChat](../controllers/cohere.controller.js#L6)     | Hace HTTPS a Cohere con clave privada, timeout y salida estructurada; rechaza respuesta vacía/truncada.                  |
| [aiStatus](../controllers/ai.controller.js#L237)         | Comprueba el proveedor real y cachea resultados correctos cinco minutos y fallos quince segundos, sin devolver la clave. |
| [listConversations](../controllers/ai.controller.js#L96) | Lista exclusivamente conversaciones del usuario.                                                                         |
| [getConversation](../controllers/ai.controller.js#L107)  | Recupera cabecera y mensajes propios ordenados por fecha.                                                                |
| [ensureAiConsent](../controllers/ai.controller.js#L87)   | Impide compartir una consulta con Cohere sin consentimiento explícito.                                                   |

Los enlaces llevan a la declaración real. Entendé qué recibe, qué valida, qué devuelve y qué puede fallar; no hace falta repetir cada palabra del código. Las operaciones de soporte compartidas se explican en [el recorrido común](README.md).

## Recorrido que tenés que poder explicar

Usuario habilita consentimiento -> consulta -> POST /ai/chat -> Cohere Command A -> JSON validado -> transacción MySQL -> pantalla e historial. La clave no viaja a React.

**Datos afectados o consultados:** usuarios.consentimiento_ia, conversaciones, mensajes y bitacora. La pantalla no escribe SQL directamente: llama a Express y Sequelize se ocupa de las consultas. Las escrituras conservan autorización, transacción, bitácora e integridad.

## Librerías de tu recorrido

React y React Router para pantalla e historial; fetch y AbortController en Node para HTTPS/timeout; Express para las rutas; Sequelize/mysql2 para mensajes en MySQL. Cohere se consume por API; no corre un modelo local. JSON estructurado y validación protegen la persistencia.

## Demostración para exponer

1. Mostrar que sin consentimiento no se puede enviar.
2. Activarlo en Mi cuenta y empezar con «hola». Continuar con una consulta de entrenamiento o una sugerencia de la pantalla.
3. Continuar la conversación y recargar para abrir el historial.
4. Probar «dale» o «gracias»: el historial permite entender mensajes breves.
5. Explicar la negativa fuera de alcance y qué pasa si Cohere no responde. Comprobar conexión vuelve a consultar el estado; el servidor puede devolver su caché.

## Preguntas que deberías poder responder

- ¿Cuál es la diferencia entre esta pantalla y su ruta de API?
- ¿Qué datos entran, qué error se valida y qué respuesta recibe React?
- ¿Qué queda guardado y cómo se comprueba después de recargar?
- ¿Cómo se evita acceder a registros ajenos?
- ¿Qué operación se cancela sin cambiar la base?

## Límites de la preentrega

No hay nutrición, administración ni generación/adaptación IA de planes en esta copia. El chat sí usa Cohere real si la clave privada y su cuota están disponibles. La base conserva tablas del DER futuro, pero tener una tabla o un método UML declarado no equivale a una funcionalidad terminada. Consultá [alcance](../docs/ALCANCE.md) y [verificación](../docs/VERIFICACION.md).

Antes de exponer, registrá tus revisiones/aportes efectivos en [REPARTO.md](../REPARTO.md). No atribuyas cambios que no realizaste.
