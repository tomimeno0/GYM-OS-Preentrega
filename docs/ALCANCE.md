# Alcance de la preentrega

Corte funcional cercano al 50%: **20 de 39 casos seleccionados (51,3% de la matriz nominal)**. No significa 51,3% del esfuerzo, de líneas ni una certificación de cumplimiento íntegro. CU014 se limita a la navegación de rutinas manuales: no incluye las opciones IA de CU015 y CU019. El porcentaje es una referencia de alcance para esta entrega.

**Incluye:** cuentas, perfil, medidas, objetivos, gráficas, rutinas manuales, catálogo, entrenamientos y chat con Cohere. **Excluye:** nutrición, administración y generación/adaptación IA de planes. No hay botones simulando esas funciones ni rutas de API para ejecutarlas.

Se conserva el esquema del DER y las clases UML para mantener la arquitectura y preparar la continuidad; las tablas dietas/dieta_comidas/comidas_consumidas no están conectadas a funcionalidades de esta versión. La infraestructura de permisos, bitácora e integridad se conserva aunque no exista panel administrativo.

| Caso  | Referencia del sistema final                                                                              | Estado en esta preentrega            |
| ----- | --------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| CU001 | Registro válido; email duplicado e inputs inválidos; password irreversible; rol Cliente; bitácora         | Incluido                             |
| CU002 | Login, credenciales erróneas, bloqueo, sesión persistida, bitácora                                        | Incluido                             |
| CU003 | Confirmar/cancelar logout, invalidar sesión, volver a inicio                                              | Incluido                             |
| CU004 | Solicitud de recuperación, correo, enlace temporal de un solo uso, cambio seguro y bitácora               | Incluido                             |
| CU005 | Ver/editar perfil y validar datos; cliente y administrador                                                | Incluido                             |
| CU006 | Confirmar/cancelar borrado de cuenta; revocar acceso y eliminar datos                                     | Incluido                             |
| CU007 | Carga inicial de peso/altura/grasa/músculo/actividad; validación, DVH/DVV y bitácora                      | Incluido                             |
| CU008 | Actualización física con historial y datos previos, DVH/DVV y bitácora                                    | Incluido                             |
| CU009 | Gestión navegable de objetivos y vuelta/cancelación                                                       | Incluido                             |
| CU010 | Definir tipo, valor, unidad, fechas, frecuencia y medición inicial; un activo; validación                 | Incluido                             |
| CU011 | Gráficos, porcentaje, historial e inicio vs actual; estado sin datos                                      | Incluido                             |
| CU012 | Completar objetivo activo, impedir repetición y conservar fecha                                           | Incluido                             |
| CU013 | Confirmar/cancelar baja de objetivo, integridad y bitácora                                                | Incluido                             |
| CU014 | Gestión navegable de todas las funciones de rutina                                                        | Navegación manual; alcance recortado |
| CU015 | IA genera usando perfil/objetivo; falta de datos; validación y persistencia                               | Fuera de alcance                     |
| CU016 | Crear rutina manual con días, ejercicios, series, repeticiones, carga, descanso y orden                   | Incluido                             |
| CU017 | Ver detalle de rutina y estado vacío                                                                      | Incluido                             |
| CU018 | Editar rutina y ejercicios manualmente; error no pierde datos                                             | Incluido                             |
| CU019 | IA adapta rutina con progreso e historial; datos insuficientes; cambios visibles                          | Fuera de alcance                     |
| CU020 | Confirmar/cancelar baja de rutina y conservar entrenamientos históricos                                   | Incluido                             |
| CU021 | Iniciar sesión de entrenamiento, seleccionar ejercicios, peso real, guardar/completar/cancelar, historial | Incluido                             |
| CU022 | Gestión navegable de dieta y cancelación                                                                  | Fuera de alcance                     |
| CU023 | IA genera dieta con perfil y objetivo; manejar fallo sin registros parciales                              | Fuera de alcance                     |
| CU024 | Crear dieta manual con comidas, alimentos, horarios, cantidades y macros                                  | Fuera de alcance                     |
| CU025 | Mostrar comidas, cantidades y macros; estado vacío                                                        | Fuera de alcance                     |
| CU026 | Adaptación IA de dieta con progreso; insuficiencia y fallo de actualización                               | Fuera de alcance                     |
| CU027 | Editar dieta/comidas/alimentos con validación y bitácora                                                  | Fuera de alcance                     |
| CU028 | Confirmar/cancelar baja de dieta                                                                          | Fuera de alcance                     |
| CU029 | Registrar consumo por fecha/hora y tipo, cantidades, cálculo de macros y resumen diario; ingreso manual   | Fuera de alcance                     |
| CU030 | Consultar macros de comidas/alimentos, información ausente y bitácora                                     | Fuera de alcance                     |
| CU031 | Conversación IA, consulta vacía, fuera de alcance, caída de conexión; soporte y entrenador                | Incluido                             |
| CU032 | Panel de administración con lista, filtros y acciones por usuario                                         | Fuera de alcance                     |
| CU033 | Crear rol con permisos, duplicado, inválido y cancelación                                                 | Fuera de alcance                     |
| CU034 | Asignar roles válidos; cancelar sin cambios                                                               | Fuera de alcance                     |
| CU035 | Modificar roles/permisos y reemplazar asignaciones con confirmación                                       | Fuera de alcance                     |
| CU036 | Eliminar rol, confirmación/cancelación, referencias y roles protegidos                                    | Fuera de alcance                     |
| CU037 | Bloquear usuario confirmado, revocar sesiones; cancelar sin cambios                                       | Fuera de alcance                     |
| CU038 | Activar usuario bloqueado confirmado; no restaurar cuentas eliminadas                                     | Fuera de alcance                     |
| CU039 | Administrador elimina usuario confirmado; cancelar sin cambios                                            | Fuera de alcance                     |

La selección está también en [alcance.json](../alcance.json). La implementación y los nombres de métodos parten del original; no se alteraron las fechas ni se fabricaron aportes del equipo.
