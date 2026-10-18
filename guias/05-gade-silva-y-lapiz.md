# Gade Silva y Lápiz: Mediciones y perfil físico

Guía exclusiva de la **preentrega**, no de todas las funciones del proyecto final. Es una asignación de estudio y revisión; no afirma autoría histórica. El código se preparó con asistencia de Codex.

## Tu funcionalidad

**Casos:** CU007, CU008. **Pantallas:** `Carga de medidas dentro de /progreso`.

Mateo explica la visualización del historial; vos la carga y persistencia de medidas. Los datos personales de la cuenta corresponden a Simón.

## Archivos que tenés que ubicar

- [client/src/pages/Fitness.jsx](../client/src/pages/Fitness.jsx).
- [controllers/fitness.controller.js](../controllers/fitness.controller.js).
- [shared/schemas.js](../shared/schemas.js).
- [models/MedicionFisica.model.js](../models/MedicionFisica.model.js).

## Qué hace cada función importante

| Función                                                       | Para qué sirve                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [MeasurementForm](../client/src/pages/Fitness.jsx#L196)       | Distingue carga inicial de nueva medición; convierte números y conserva campos opcionales. |
| [addMeasurement](../controllers/fitness.controller.js#L104)   | Ejecuta el caso UML de carga/actualización, valida fecha y guarda una nueva fila.          |
| [latestMeasurement](../controllers/fitness.controller.js#L24) | Busca la medición más reciente, o anterior a una fecha cuando se necesita comparación.     |
| [listMeasurements](../controllers/fitness.controller.js#L43)  | Lista historial propio paginado y ordenado.                                                |
| [measurementSchema](../shared/schemas.js#L47)                 | Limita peso, altura y porcentajes; impide que grasa y músculo sumen más de 100.            |

Los enlaces llevan a la declaración real. Entendé qué recibe, qué valida, qué devuelve y qué puede fallar; no hace falta repetir cada palabra del código. Las operaciones de soporte compartidas se explican en [el recorrido común](README.md).

## Recorrido que tenés que poder explicar

Peso/altura y opcionales -> formulario -> validación Zod -> medición nueva con fecha -> historial anterior intacto. No se sobreescribe una medición vieja.

**Datos afectados o consultados:** mediciones_fisicas y bitacora. La pantalla no escribe SQL directamente: llama a Express y Sequelize se ocupa de las consultas. Las escrituras conservan autorización, transacción, bitácora e integridad.

## Librerías de tu recorrido

React y React Router administran pantallas y acciones. Express recibe solicitudes; Zod valida contratos; Sequelize/mysql2 persisten o consultan MySQL. En cuentas se usan crypto de Node y Nodemailer para seguridad y recuperación; el correo de desarrollo es un archivo, no un envío real. Estudiá las librerías que realmente intervienen en tu función, no las dependencias completas.

## Demostración para exponer

1. Cargar el perfil físico inicial.
2. Guardar una medición posterior con un peso distinto.
3. Rechazar valores fuera de rango y fechas futuras.
4. Mostrar que ambas filas permanecen en el historial.

## Preguntas que deberías poder responder

- ¿Cuál es la diferencia entre esta pantalla y su ruta de API?
- ¿Qué datos entran, qué error se valida y qué respuesta recibe React?
- ¿Qué queda guardado y cómo se comprueba después de recargar?
- ¿Cómo se evita acceder a registros ajenos?
- ¿Qué operación se cancela sin cambiar la base?

## Límites de la preentrega

No hay nutrición, administración ni generación/adaptación IA de planes en esta copia. El chat sí usa Cohere real si la clave privada y su cuota están disponibles. La base conserva tablas del DER futuro, pero tener una tabla o un método UML declarado no equivale a una funcionalidad terminada. Consultá [alcance](../docs/ALCANCE.md) y [verificación](../docs/VERIFICACION.md).

Antes de exponer, registrá tus revisiones/aportes efectivos en [REPARTO.md](../REPARTO.md). No atribuyas cambios que no realizaste.
