<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Proyecto Teslo Shop

Seguimiento de curso de NestJS en [Udemy](https://www.udemy.com/course/nest-framework/)

> Creado en NestJS

## DEV

1. Clonar repositorio con `git clone`
2. Copiar los valores de `.env.example` a `.env`
3. Instalar los paquetes de NodeJS con `npm install`
4. Ejecutar el proyecto con `npm run start`

## Requisitos

1. Tener instalado NodeJS
2. Base de datos postgresql o conexion a [neondb](https://neon.tech/)

## Scripts

Algunos scripts que pueden ser utilizados

| Comando             | Descripcion              |
| ------------------- | ------------------------ |
| `npm install`       | Instala las dependencias |
| `npm run build`     | Compila la web           |
| `npm run start:dev` | Inicia el modo debug     |

#### Otros Scripts

Otros scripts que pueden usar para fines de desarrollo, (acciones de paquetes)

| Comando                                                                                      | Descripcion                          |
| -------------------------------------------------------------------------------------------- | ------------------------------------ |
| `docker compose -f docker-compose.prod.yaml build`                                           | Construccion de la imagen            |
| `docker build --tag <user>/<image>:<tag> --push .`                                           | Construccion mediante buildx         |
| `docker buildx create <super-builder>`                                                       | BUILDX crear builder                 |
| `docker buildx use <super-builder>`                                                          | BUILDX usar builder                  |
| `docker buildx rm <super-builder>`                                                           | BUILDX eliminar builder              |
| `docker buildx build --platform linux/amd64,linux/arm64 --tag <user>/<image>:<tag> --push .` | BUILDX construir y subir a dockerhub |

## Documentacion

Links de librerias utilizadas

- [NestJS](https://nestjs.com)
- [NodeJS](https://nodejs.org/en)
  - [Single Executable Files](https://nodejs.org/api/single-executable-applications.html)
  - [Nexe](https://github.com/nexe/nexe)
- [NestJS Curso Gratuito](https://bluuweb.dev/nestjs/crud-mysql.html)
- [NestJS Scheduler](https://docs.nestjs.com/techniques/task-scheduling)
- [NestJS - EJS engine](https://medium.com/@karahanozen/add-ejs-to-nest-js-application-c70f944d6419)
- [Mail con EJS](https://stackoverflow.com/questions/41304922/sending-ejs-template-using-nodemailer)
- [Nest Mailer](https://nest-modules.github.io/mailer/docs/mailer)
- [Websocket auth](https://medium.com/wisdomcircle-product/the-best-way-to-authenticate-websockets-in-nestjs-f26e07a49353)

#### Winston

- [Logging con Wiston](https://mirzaleka.medium.com/automated-logging-in-express-js-a1f85ca6c5cd)
- [Winston + NestJS](https://www.npmjs.com/package/nest-winston)
- [Winston Formatos](https://dev.to/naineel12/lets-build-a-production-ready-logger-using-winston-oo4)
- [Winston NestJS Style](https://stackoverflow.com/questions/76959383/how-to-simulate-nestjs-color-logs-with-winston-logger)