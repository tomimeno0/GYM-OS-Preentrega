# Edición 50 · alcance actual

El nombre de la entrega se conserva. Tras el recorte solicitado hay **19/39 casos nominales (48,72 %)**; no es un porcentaje de esfuerzo ni certificación de todos los diagramas.

Incluye cuentas, perfil, mediciones, objetivos, progreso, rutinas manuales, catálogo, entrenamientos y chat con Cohere. La selección exacta está en [alcance.json](../alcance.json).

Se retiraron CU004, su interfaz, rutas, controlador, modelo y dependencias. También se quitaron los limitadores de intentos y la comprobación de origen/cabecera de escritura. No se reemplazaron por mecanismos equivalentes ocultos. El registro, login, hash de contraseñas, cookie de sesión y filtros de propiedad siguen funcionando. No se considera una configuración adecuada para exponer públicamente un servicio de producción.

La arquitectura es la del curso: CommonJS, rutas, controladores y modelos explícitos. No hay servicios, clases delegadoras, validadores genéricos, HMAC de tablas, mutex ni reintentos automáticos de IA. Se mantienen try/catch, validaciones de datos y transacciones concretas de cabecera/detalle.

Las columnas dvh del DER quedan reservadas; no se implementan DVH/DVV. Los nombres UML del corte se usan como funciones, no como una jerarquía de clases. El pedido actual excluye expresamente la operación retirada, aunque aparezca en el documento original.

No hay nutrición, administración ni generación/adaptación de planes IA. Se eliminaron también sus archivos y modelos; el chat no modifica planes. La base anterior de la versión 50 queda preservada, sin migrar: esta reescritura usa una base nueva en 3311, con cuentas nuevas. El historial Git y un respaldo privado permiten recuperar el código previo.
