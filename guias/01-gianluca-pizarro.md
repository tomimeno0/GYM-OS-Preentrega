# Gianluca Pizarro: Acceso y recuperación

Guía exclusiva de la **preentrega**, no de todas las funciones del proyecto final. Es una asignación de estudio y revisión; no afirma autoría histórica. El código se preparó con asistencia de Codex.

## Tu funcionalidad

**Casos:** CU001–CU004. **Pantallas:** `/registro, /login, /recuperar, /restablecer`.

El perfil personal y borrado corresponden a Simón; no mezclar recuperación con administración de usuarios.

## Archivos que tenés que ubicar

- [routes/accounts.routes.js](../routes/accounts.routes.js).
- [controllers/accounts.controller.js](../controllers/accounts.controller.js).
- [controllers/security.controller.js](../controllers/security.controller.js).
- [controllers/mail.controller.js](../controllers/mail.controller.js).
- [client/src/pages/Auth.jsx](../client/src/pages/Auth.jsx).

## Qué hace cada función importante

| Función                                                       | Para qué sirve                                                                          |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Auth](../client/src/pages/Auth.jsx#L118)                     | Elige registro, login o recuperación según la pantalla; conserva errores de formulario. |
| [register](../controllers/accounts.controller.js#L57)         | Valida unicidad, calcula hash y crea usuario Cliente más sesión en una transacción.     |
| [sessionFor](../controllers/accounts.controller.js#L44)       | Crea un token aleatorio; guarda solamente su hash y vencimiento.                        |
| [login](../controllers/accounts.controller.js#L123)           | Comprueba contraseña y estado, registra el acceso y abre sesión.                        |
| [authenticate](../controllers/accounts.controller.js#L125)    | Lee token y fecha; rechaza sesión revocada o cuenta no activa.                          |
| [logout](../controllers/accounts.controller.js#L155)          | Revoca la sesión después de confirmar; cancelar en React no envía cambios.              |
| [requestRecovery](../controllers/accounts.controller.js#L212) | Genera enlace temporal y mensaje sin revelar si existe el correo.                       |
| [resetPassword](../controllers/accounts.controller.js#L240)   | Verifica token de un solo uso, cambia el hash y revoca sesiones.                        |

Los enlaces llevan a la declaración real. Entendé qué recibe, qué valida, qué devuelve y qué puede fallar; no hace falta repetir cada palabra del código. Las operaciones de soporte compartidas se explican en [el recorrido común](README.md).

## Recorrido que tenés que poder explicar

Correo y contraseña -> ruta validada -> hash/sesión -> cookie HttpOnly -> acceso al panel. En recuperación se genera un correo privado de desarrollo; no llega a un buzón externo.

**Datos afectados o consultados:** usuarios, usuario_roles, roles, sesiones, recuperaciones y bitacora. La pantalla no escribe SQL directamente: llama a Express y Sequelize se ocupa de las consultas. Las escrituras conservan autorización, transacción, bitácora e integridad.

## Librerías de tu recorrido

React y React Router administran pantallas y acciones. Express recibe solicitudes; Zod valida contratos; Sequelize/mysql2 persisten o consultan MySQL. En cuentas se usan crypto de Node y Nodemailer para seguridad y recuperación; el correo de desarrollo es un archivo, no un envío real. Estudiá las librerías que realmente intervienen en tu función, no las dependencias completas.

## Demostración para exponer

1. Registrar una cuenta y volver a entrar.
2. Probar correo duplicado y contraseña errónea.
3. Cancelar y luego confirmar el cierre de sesión.
4. Explicar el enlace temporal y dónde queda el correo de desarrollo.

## Preguntas que deberías poder responder

- ¿Cuál es la diferencia entre esta pantalla y su ruta de API?
- ¿Qué datos entran, qué error se valida y qué respuesta recibe React?
- ¿Qué queda guardado y cómo se comprueba después de recargar?
- ¿Cómo se evita acceder a registros ajenos?
- ¿Qué operación se cancela sin cambiar la base?

## Límites de la preentrega

No hay nutrición, administración ni generación/adaptación IA de planes en esta copia. El chat sí usa Cohere real si la clave privada y su cuota están disponibles. La base conserva tablas del DER futuro, pero tener una tabla o un método UML declarado no equivale a una funcionalidad terminada. Consultá [alcance](../docs/ALCANCE.md) y [verificación](../docs/VERIFICACION.md).

Antes de exponer, registrá tus revisiones/aportes efectivos en [REPARTO.md](../REPARTO.md). No atribuyas cambios que no realizaste.
