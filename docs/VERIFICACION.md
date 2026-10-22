# Verificación · edición 50

Revisión del recorte actual del 22 de octubre de 2026, con cuentas sintéticas y MySQL real. No certifica todas las alternativas de los diagramas ni ausencia de bugs.

## API y base

Se completaron **82 solicitudes HTTP** y 13 comprobaciones agrupadas: registro/login, perfil, mediciones e historial, objetivos, rutinas, copia de ejercicios al entrenar, cierre de sesión y separación entre cuentas. Las escrituras funcionan sin la cabecera especial ni el control de origen retirados. Más de 40 intentos de ingreso incorrectos no activan un limitador. Las rutas eliminadas devuelven 404 para una sesión válida; no hay modelo ni tabla activa de esa función. El perfil público no revela hashes y los filtros de propiedad siguen funcionando.

Se verificó que una edición inválida no cambie la rutina, que no haya dos entrenamientos activos para una cuenta y que una medición posterior no altere el progreso de un objetivo completado.

El chat respondió mediante Cohere real y conservó la conversación. Una segunda cuenta no pudo abrirla. Una prueba visual detectó una indicación de menú incorrecta: se incluyó el mapa real de navegación en el prompt y se volvió a comprobar con el proveedor la respuesta Entrenamientos / Tu historial. Eso no garantiza que un modelo nunca se equivoque. No hay respuesta simulada, modelo local ni reintento automático.

Se comprobaron además respuestas 404 y ausencia de modelos para nutrición y rutas de generación de planes IA. La reescritura usa una base nueva en 3311; la base anterior y el respaldo privado de código/configuración se preservaron sin migrar ni borrar.

## Pantallas y ejecución

Se inició sesión desde el navegador, se creó una rutina manual, se inició y completó un entrenamiento con confirmación y se observó su historial. El chat devolvió una respuesta real, corregida tras detectar el menú equivocado. Las siete pantallas protegidas se recorrieron a 390 px sin desbordamiento horizontal. Se inspeccionaron el resumen de escritorio y el chat móvil. Capturas: [resumen](capturas/resumen-recorte.png) y [chat móvil](capturas/chat-recorte-movil.png).

Ambos proyectos compilaron. npm audit no informó vulnerabilidades conocidas en backend y frontend en esta revisión. Vite mantiene el aviso de archivo principal superior a 500 kB; no es un error de compilación. Se verifican enlaces de documentación, nueve guías por versión y ausencia de secretos y suites de tests en los archivos versionados. No se prueba producción ni concurrencia masiva; al quitar los controles solicitados, no debe exponerse este servidor como un servicio público.
