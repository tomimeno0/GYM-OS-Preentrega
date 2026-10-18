# Verificación de la preentrega · 18/10/2026

Se verificó esta copia independiente, no se heredaron resultados del proyecto final. Entorno: React/Vite 5174, Express 3002 y MySQL 8.4 en 3309, base/volumen propios. El final y la entrega antigua de login/registro no se modificaron para producir estos resultados.

## Funcional

**76 comprobaciones aprobadas**, usando cuentas y datos inventados. Incluyen registro, duplicados, login, sesión, datos personales, CSRF, perfil físico inicial y nuevas medidas, rangos/fechas, objetivos y meta única activa, progreso, catálogo, rutinas manuales, edición y objetivo histórico, sesiones deportivas, avance/cierre e historial inmutable, aislamiento de usuarios, historial de chat, consentimiento revocable, recuperación local y eliminación de cuenta con sus datos.

Se hicieron llamadas reales a Cohere Command A para estado, chat inicial y continuación. No se usó AI_MOCK. En navegador se comprobó además el modo soporte mediante otra llamada real, cuyo resultado enumeró correctamente el alcance de esta versión. Una prueba de disponibilidad no garantiza cuota o servicio futuros. Las consultas no contenían datos personales reales.

Los endpoints de nutrición, alimentos, administración y generación/adaptación de planes devolvieron 404 para un usuario autenticado. El dashboard no devuelve nutrición. La integridad DVH/DVV resultó válida al terminar. Los errores seguros no revelan la API key. En el primer guion se corrigió una expectativa de prueba: contraseña incorrecta al borrar cuenta responde 403, no 401; se repitió el recorrido completo y pasó.

## Navegador real

Chrome de escritorio: inicio y login, panel con datos, detalle de rutina, confirmación de eliminación y cancelación sin cambios, chat real con modo soporte. La navegación no muestra nutrición ni administración; el chat no muestra generadores de planes. Abrir directamente /nutricion muestra la pantalla de ruta inexistente.

Vista móvil 390 × 844: chat/historial, apertura del menú, navegación a progreso, métricas, gráfico e historial y apertura/cancelación de carga de medidas. En chat y progreso se midió ancho de documento 390, igual al viewport: no hubo desborde horizontal global. El viewport temporal se restableció al finalizar. No se certifican todos los dispositivos, lectores de pantalla ni navegadores.

- [Panel](capturas/panel.png).
- [Chat real](capturas/chat-real.png).
- [Chat móvil](capturas/chat-movil.png).
- [Progreso móvil](capturas/progreso-movil.png).

## Calidad y límites

Se ejecutaron instalación con npm ci, formato y compilación. Las nueve guías tienen 162 enlaces locales comprobados; los enlaces de funciones apuntan a declaraciones existentes. No se añadieron suites de tests versionadas ni comentarios de código. Los guiones, credenciales de prueba y resultados detallados están en .local/qa, ignorados por Git.

La cuenta ficticia principal puede conservarse en la base local para practicar la demostración; su acceso no se publica. La cuenta secundaria usada para comprobar aislamiento/borrado se eliminó. El ZIP/repositorio no incluyen ni esa base ni claves ni contraseñas: en otra computadora hay que configurar el entorno y registrarse.

El correo de recuperación solo se generó en archivo privado de desarrollo: no se verificó SMTP real ni entrega a un buzón. No se certificaron hosting público, carga concurrente, recuperación ante desastre, seguridad exhaustiva ni equivalencia semántica integral de todos los diagramas. El alcance nominal se detalla en ALCANCE.md: no es una garantía de 50% de esfuerzo ni de cumplimiento académico total.
