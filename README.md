<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Proyecto Teslo Shop

Seguimiento de curso de NestJS

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
