# Docker

Para realizar el build del docker compose 

```bash
docker compose build
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- Remake de un proyecto de nestjs, para recordar las bases

## Dependencies

1. **DATABASE deps**

```bash
@nestjs/typeorm typeorm pg
```

2. **NESTJS deps**

```bash
@nestjs/config
@nestjs/serve-static
```

3. **HASHING deps**

```bash
bcrypt
@types/bcrypt
```

4. **VALIDATION deps**

```bash
class-validator class-transformer
```

5. **JWT deps**

```bash
@nestjs/passport @nestjs/jwt
passport passport-local passport-jwt
@types/passport-local @types/passport-jwt
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
