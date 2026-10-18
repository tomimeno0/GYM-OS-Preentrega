# GYM-OS · Preentrega

Versión parcial de estudio y demostración, derivada del [proyecto GYM-OS](https://github.com/tomimeno0/GYM-OS) (base `1e91986`) con asistencia de Codex. Incluye 20 de los 39 casos nominales, aproximadamente la mitad; el recorte y sus límites se detallan en [ALCANCE](docs/ALCANCE.md). No es el sistema final ni una historia de autorías individuales.

JavaScript, React, Express, Sequelize y MySQL 8.4. Misma estructura por `config`, `routes`, `controllers`, `models`, `shared` y `client`. Nueve funcionalidades repartidas en [REPARTO.md](REPARTO.md), con [una guía por integrante](guias/README.md). Tomás se ocupa del chat IA.

## Funciones

Cuentas y recuperación, perfil propio y eliminación, medidas históricas, objetivos, panel/progreso, rutinas manuales, catálogo textual de 1324 ejercicios, entrenamientos e historial y chat Cohere con consentimiento.

No incluye dietas, consumo/macros, administración ni generación/adaptación de planes por IA. Se retiraron sus pantallas y endpoints. El chat no genera planes persistidos.

## Ejecutar

Requiere Node >=22.12, Docker/Compose y puertos libres 5174/3002/3309. No se necesita instalar un modelo local.

```sh
npm ci
npm run setup
docker compose up -d mysql
npm run db:migrate
npm run db:seed
npm run dev
```

En esta Mac con Colima: `colima start --profile gymos` y `DOCKER_CONTEXT=colima-gymos docker-compose up -d mysql` en lugar de `docker compose`. La base debe estar saludable antes de migrar. Los comandos no reutilizan el volumen del final.

Abrir http://localhost:5174. API http://localhost:3002; MySQL 127.0.0.1:3309. Registrate: no se publican contraseñas de prueba. Cada instalación genera sus propios secretos; `npm run setup` nunca reemplaza `.env`.

Para IA, configurar `COHERE_API_KEY` en `.env`, mantener `AI_MOCK=false` y activar consentimiento desde Mi cuenta. El modelo por defecto es `command-a-03-2025`. La clave de prueba depende de su cuota. No compartir `.env` ni subirlo a Git. El correo de recuperación de desarrollo queda en `.local/mail/`; no llega a un buzón real.

## Comprobar y entregar

`npm run check` revisa formato y compila. `npm audit` revisa avisos conocidos de dependencias. La comprobación funcional y visual se describe en [VERIFICACION](docs/VERIFICACION.md); los scripts temporales y credenciales no se versionan. No hay suites de tests ni comentarios de código añadidos.

`npm run build` prepara React y `npm start` sirve el build desde la API. En ese modo configurá `APP_ORIGIN=http://localhost:3002` y reiniciá. Desarrollo habitual usa 5174. Producción requiere HTTPS y operación propia; este repositorio no certifica ese despliegue.

## Datos y seguridad

Base y volumen propios: `gym_os_preentrega`, proyecto Compose `gym-os-preentrega`. No usar `down -v` para apagar: borra datos. `Ctrl+C` detiene API/Vite; `docker-compose --context colima-gymos stop` detiene esta base sin borrar el volumen.

Se conservan cifrado de teléfono, hash de contraseñas, cookie HttpOnly separada, validación de origen, aislamiento por usuario, bitácora e integridad. Las tablas futuras del DER no se cuentan como funciones completas. El catálogo textual tiene atribución y licencia en `models/exercises/`; no se incluyen imágenes/GIF con otra licencia. Los planes y orientación no sustituyen atención profesional.
