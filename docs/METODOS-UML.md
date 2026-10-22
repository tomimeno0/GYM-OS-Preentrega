# Operaciones del corte

Los nombres provenientes del UML se conservan donde pertenecen al alcance; las implementaciones son funciones de controlador. No se simulan clases. Las exclusiones y diferencias del DER se explican en [ALCANCE.md](ALCANCE.md).

| Función actual | Implementación |
| --- | --- |
| `verificarSesion` | [auth.controller.js](../controllers/auth.controller.js#L6) |
| `registrarEvento` | [bitacora.controller.js](../controllers/bitacora.controller.js#L3) |
| `listarEntrenamientos` | [entrenamientos.controller.js](../controllers/entrenamientos.controller.js#L9) |
| `iniciarEntrenamiento` | [entrenamientos.controller.js](../controllers/entrenamientos.controller.js#L24) |
| `actualizarRegistro` | [entrenamientos.controller.js](../controllers/entrenamientos.controller.js#L93) |
| `generarConIA` | [ia.controller.js](../controllers/ia.controller.js#L4) |
| `responderconsulta` | [ia.controller.js](../controllers/ia.controller.js#L31) |
| `responderConsulta` | [ia.controller.js](../controllers/ia.controller.js#L51) |
| `listarConversaciones` | [ia.controller.js](../controllers/ia.controller.js#L135) |
| `verConversacion` | [ia.controller.js](../controllers/ia.controller.js#L149) |
| `estadoIA` | [ia.controller.js](../controllers/ia.controller.js#L168) |
| `cambiarPeso` | [mediciones.controller.js](../controllers/mediciones.controller.js#L4) |
| `cambiarAltura` | [mediciones.controller.js](../controllers/mediciones.controller.js#L14) |
| `cambiarPorcMusculo` | [mediciones.controller.js](../controllers/mediciones.controller.js#L24) |
| `cambiarPorcGraso` | [mediciones.controller.js](../controllers/mediciones.controller.js#L35) |
| `cambiarNivelActividad` | [mediciones.controller.js](../controllers/mediciones.controller.js#L46) |
| `actualizarMedicion` | [mediciones.controller.js](../controllers/mediciones.controller.js#L52) |
| `listarMediciones` | [mediciones.controller.js](../controllers/mediciones.controller.js#L136) |
| `visuaizarObjetivo` | [objetivos.controller.js](../controllers/objetivos.controller.js#L5) |
| `definirObjeto` | [objetivos.controller.js](../controllers/objetivos.controller.js#L22) |
| `marcarCompletado` | [objetivos.controller.js](../controllers/objetivos.controller.js#L172) |
| `eliminarObjetivo` | [objetivos.controller.js](../controllers/objetivos.controller.js#L201) |
| `calcularPorcentaje` | [progreso.controller.js](../controllers/progreso.controller.js#L8) |
| `verProgreso` | [progreso.controller.js](../controllers/progreso.controller.js#L19) |
| `validarEjercicios` | [rutinas.controller.js](../controllers/rutinas.controller.js#L11) |
| `agregarEjercicio` | [rutinas.controller.js](../controllers/rutinas.controller.js#L78) |
| `eliminarEjercicio` | [rutinas.controller.js](../controllers/rutinas.controller.js#L81) |
| `actualizarRutinaEjercicio` | [rutinas.controller.js](../controllers/rutinas.controller.js#L84) |
| `guardarRutina` | [rutinas.controller.js](../controllers/rutinas.controller.js#L89) |
| `listarRutinas` | [rutinas.controller.js](../controllers/rutinas.controller.js#L105) |
| `actualizarRutina` | [rutinas.controller.js](../controllers/rutinas.controller.js#L124) |
| `eliminarRutina` | [rutinas.controller.js](../controllers/rutinas.controller.js#L185) |
| `listarEjercicios` | [rutinas.controller.js](../controllers/rutinas.controller.js#L215) |
| `encriptarRreversible` | [seguridad.controller.js](../controllers/seguridad.controller.js#L10) |
| `desencriptar` | [seguridad.controller.js](../controllers/seguridad.controller.js#L31) |
| `datosPublicos` | [usuarios.controller.js](../controllers/usuarios.controller.js#L14) |
| `abrirSesion` | [usuarios.controller.js](../controllers/usuarios.controller.js#L28) |
| `registrarUsuario` | [usuarios.controller.js](../controllers/usuarios.controller.js#L51) |
| `iniciarSesion` | [usuarios.controller.js](../controllers/usuarios.controller.js#L123) |
| `cerrarSesion` | [usuarios.controller.js](../controllers/usuarios.controller.js#L150) |
| `verCuenta` | [usuarios.controller.js](../controllers/usuarios.controller.js#L167) |
| `actualizarDatos` | [usuarios.controller.js](../controllers/usuarios.controller.js#L171) |
| `eliminarCuenta` | [usuarios.controller.js](../controllers/usuarios.controller.js#L228) |
