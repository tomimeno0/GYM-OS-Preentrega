# Iván Lerner: Entrenamientos e historial

Guía exclusiva de la **preentrega**, no de todas las funciones del proyecto final. Es una asignación de estudio y revisión; no afirma autoría histórica. El código se preparó con asistencia de Codex.

## Tu funcionalidad

**Casos:** CU021. **Pantallas:** `/entrenamientos, /entrenamientos/:id`.

Valentín diseña rutinas; Joaquín explica el catálogo. Mateo usa las sesiones para el progreso.

## Archivos que tenés que ubicar

- [client/src/pages/Routines.jsx](../client/src/pages/Routines.jsx).
- [controllers/workouts.controller.js](../controllers/workouts.controller.js).
- [routes/fitness.routes.js](../routes/fitness.routes.js).
- [models/Entrenamiento.model.js](../models/Entrenamiento.model.js).
- [models/EntrenamientoEjercicio.model.js](../models/EntrenamientoEjercicio.model.js).

## Qué hace cada función importante

| Función                                                    | Para qué sirve                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Workouts](../client/src/pages/Routines.jsx#L601)          | Lista sesiones y permite paginar el historial.                                                               |
| [WorkoutDetail](../client/src/pages/Routines.jsx#L647)     | Carga el detalle autorizado antes de mostrar el formulario.                                                  |
| [WorkoutForm](../client/src/pages/Routines.jsx#L652)       | Registra series, repeticiones, peso real y ejercicios realizados; confirma el cierre.                        |
| [startWorkout](../controllers/workouts.controller.js#L46)  | Exige rutina propia y día válido; impide dos sesiones en curso y toma una copia histórica de los ejercicios. |
| [saveWorkout](../controllers/workouts.controller.js#L154)  | Permite guardar avance o cerrar; un entrenamiento terminado no se vuelve a modificar.                        |
| [workoutDetail](../controllers/workouts.controller.js#L18) | Devuelve ejercicios de esa sesión, no los de una rutina editada después.                                     |
| [listWorkouts](../controllers/workouts.controller.js#L33)  | Devuelve historial propio paginado con conteo total.                                                         |

Los enlaces llevan a la declaración real. Entendé qué recibe, qué valida, qué devuelve y qué puede fallar; no hace falta repetir cada palabra del código. Las operaciones de soporte compartidas se explican en [el recorrido común](README.md).

## Recorrido que tenés que poder explicar

Rutina manual de Valentín -> inicio de sesión -> copia de ejercicios -> avance -> confirmación de completado -> registro histórico inmutable.

**Datos afectados o consultados:** entrenamientos, entrenamiento_ejercicios, rutinas y bitacora. La pantalla no escribe SQL directamente: llama a Express y Sequelize se ocupa de las consultas. Las escrituras conservan autorización, transacción, bitácora e integridad.

## Librerías de tu recorrido

React y React Router administran pantallas y acciones. Express recibe solicitudes; Zod valida contratos; Sequelize/mysql2 persisten o consultan MySQL. En cuentas se usan crypto de Node y Nodemailer para seguridad y recuperación; el correo de desarrollo es un archivo, no un envío real. Estudiá las librerías que realmente intervienen en tu función, no las dependencias completas.

## Demostración para exponer

1. Iniciar una sesión desde una rutina.
2. Marcar ejercicios y guardar avance antes de finalizar.
3. Completar y comprobar que ya no se puede editar.
4. Cambiar la rutina y verificar que la sesión vieja no cambia.

## Preguntas que deberías poder responder

- ¿Cuál es la diferencia entre esta pantalla y su ruta de API?
- ¿Qué datos entran, qué error se valida y qué respuesta recibe React?
- ¿Qué queda guardado y cómo se comprueba después de recargar?
- ¿Cómo se evita acceder a registros ajenos?
- ¿Qué operación se cancela sin cambiar la base?

## Límites de la preentrega

No hay nutrición, administración ni generación/adaptación IA de planes en esta copia. El chat sí usa Cohere real si la clave privada y su cuota están disponibles. La base conserva tablas del DER futuro, pero tener una tabla o un método UML declarado no equivale a una funcionalidad terminada. Consultá [alcance](../docs/ALCANCE.md) y [verificación](../docs/VERIFICACION.md).

Antes de exponer, registrá tus revisiones/aportes efectivos en [REPARTO.md](../REPARTO.md). No atribuyas cambios que no realizaste.
