# Reparto por endpoints · edición 50

Los **27 endpoints HTTP de la aplicación** tienen un responsable principal, sin duplicados ni rutas inventadas. Se incluyen 26 de cuentas/gimnasio/IA y `GET /api/salud`. Las rutas visuales de React y el fallback de archivos estáticos no se cuentan como endpoints de negocio.

El reparto es de estudio, revisión y defensa; no acredita autoría histórica. Se conserva la agrupación funcional para que las operaciones relacionadas queden juntas. La cantidad de rutas no mide esfuerzo ni porcentaje de código.

**Cómo leerlo:** el endpoint es método + ruta completa. `GET /api/rutinas` y `POST /api/rutinas` son dos endpoints distintos; `:id` es un parámetro. Todas las rutas de los routers se montan bajo `/api` en index.js. Axios usa ese prefijo automáticamente.

| Integrante y guía | Grupo | Endpoints asignados | Cantidad |
| --- | --- | --- | ---: |
| [Gianluca Pizarro](01-gianluca-pizarro.md) | Registro, sesión y estado del servidor | `POST /api/registro`<br>`POST /api/login`<br>`POST /api/logout`<br>`GET /api/salud` | 4 |
| [Tomás Menossi](02-tomas-menossi.md) | Chat con Cohere e historial de conversaciones | `GET /api/ia/estado`<br>`POST /api/ia/consulta`<br>`GET /api/ia/conversaciones`<br>`GET /api/ia/conversaciones/:id` | 4 |
| [Iván Lerner](03-ivan-lerner.md) | Entrenamientos e historial | `GET /api/entrenamientos`<br>`POST /api/entrenamientos`<br>`PUT /api/entrenamientos/:id` | 3 |
| [Paulo López](04-paulo-lopez.md) | Objetivos personales | `GET /api/objetivos`<br>`POST /api/objetivos`<br>`POST /api/objetivos/:id/completar`<br>`DELETE /api/objetivos/:id` | 4 |
| [Gade Silva y Lápiz](05-gade-silva-y-lapiz.md) | Mediciones y perfil físico | `GET /api/mediciones`<br>`POST /api/mediciones/initial`<br>`POST /api/mediciones` | 3 |
| [Valentín Schueld (Sueco)](06-valentin-schueld.md) | Alta, edición y baja de rutinas manuales | `POST /api/rutinas`<br>`PUT /api/rutinas/:id`<br>`DELETE /api/rutinas/:id` | 3 |
| [Mateo Romani](07-mateo-romani.md) | Resumen y cálculo del progreso | `GET /api/progreso` | 1 |
| [Joaquín Casanou](08-joaquin-casanou.md) | Catálogo y consulta de rutinas | `GET /api/ejercicios`<br>`GET /api/rutinas` | 2 |
| [Simón Castellani](09-simon-castellani.md) | Mi cuenta y datos personales | `GET /api/cuenta`<br>`PUT /api/cuenta`<br>`DELETE /api/cuenta` | 3 |

## Cobertura completa

| Endpoint | Responsable principal | Handler |
| --- | --- | --- |
| `DELETE /api/cuenta` | [Simón Castellani](09-simon-castellani.md) | `eliminarCuenta` |
| `DELETE /api/objetivos/:id` | [Paulo López](04-paulo-lopez.md) | `eliminarObjetivo` |
| `DELETE /api/rutinas/:id` | [Valentín Schueld (Sueco)](06-valentin-schueld.md) | `eliminarRutina` |
| `GET /api/cuenta` | [Simón Castellani](09-simon-castellani.md) | `verCuenta` |
| `GET /api/ejercicios` | [Joaquín Casanou](08-joaquin-casanou.md) | `listarEjercicios` |
| `GET /api/entrenamientos` | [Iván Lerner](03-ivan-lerner.md) | `listarEntrenamientos` |
| `GET /api/ia/conversaciones` | [Tomás Menossi](02-tomas-menossi.md) | `listarConversaciones` |
| `GET /api/ia/conversaciones/:id` | [Tomás Menossi](02-tomas-menossi.md) | `verConversacion` |
| `GET /api/ia/estado` | [Tomás Menossi](02-tomas-menossi.md) | `estadoIA` |
| `GET /api/mediciones` | [Gade Silva y Lápiz](05-gade-silva-y-lapiz.md) | `listarMediciones` |
| `GET /api/objetivos` | [Paulo López](04-paulo-lopez.md) | `visuaizarObjetivo` |
| `GET /api/progreso` | [Mateo Romani](07-mateo-romani.md) | `verProgreso` |
| `GET /api/rutinas` | [Joaquín Casanou](08-joaquin-casanou.md) | `listarRutinas` |
| `GET /api/salud` | [Gianluca Pizarro](01-gianluca-pizarro.md) | `handler en index.js` |
| `POST /api/entrenamientos` | [Iván Lerner](03-ivan-lerner.md) | `iniciarEntrenamiento` |
| `POST /api/ia/consulta` | [Tomás Menossi](02-tomas-menossi.md) | `responderConsulta` |
| `POST /api/login` | [Gianluca Pizarro](01-gianluca-pizarro.md) | `iniciarSesion` |
| `POST /api/logout` | [Gianluca Pizarro](01-gianluca-pizarro.md) | `cerrarSesion` |
| `POST /api/mediciones` | [Gade Silva y Lápiz](05-gade-silva-y-lapiz.md) | `actualizarMedicion` |
| `POST /api/mediciones/initial` | [Gade Silva y Lápiz](05-gade-silva-y-lapiz.md) | `actualizarMedicion` |
| `POST /api/objetivos` | [Paulo López](04-paulo-lopez.md) | `definirObjeto` |
| `POST /api/objetivos/:id/completar` | [Paulo López](04-paulo-lopez.md) | `marcarCompletado` |
| `POST /api/registro` | [Gianluca Pizarro](01-gianluca-pizarro.md) | `registrarUsuario` |
| `POST /api/rutinas` | [Valentín Schueld (Sueco)](06-valentin-schueld.md) | `actualizarRutina` |
| `PUT /api/cuenta` | [Simón Castellani](09-simon-castellani.md) | `actualizarDatos` |
| `PUT /api/entrenamientos/:id` | [Iván Lerner](03-ivan-lerner.md) | `actualizarRegistro` |
| `PUT /api/rutinas/:id` | [Valentín Schueld (Sueco)](06-valentin-schueld.md) | `actualizarRutina` |

## Criterio del reparto

Cada endpoint tiene un solo responsable principal. Que dos rutas usen el mismo handler —por ejemplo POST y PUT de rutinas— no las convierte en una sola ruta. Compartir una función de cálculo o persistencia tampoco duplica la propiedad del endpoint. Las nueve guías mantienen sus diagramas dentro de cada MD.

La distribución busca continuidad funcional y carga razonable, no nueve cantidades iguales de rutas. Las rutas que calculan progreso, guardan varios detalles o llaman a Cohere requieren más explicación que un listado simple.

En el 50, Valentín se ocupa de escribir rutinas y Joaquín de consultarlas y del catálogo. Mateo estudia el único endpoint de progreso, que reúne cálculos y gráficos. No se asignan nutrición ni generación de planes IA porque no existen en esta entrega.

## Lectura de la implementación

Cada guía incluye una sección sobre la lógica simplificada y las diferencias que se conservan frente al repaso. El reparto y el alcance no cambiaron. Consultá el [criterio del profesor y las protecciones conservadas](../docs/CRITERIO-DEL-PROFESOR.md).
