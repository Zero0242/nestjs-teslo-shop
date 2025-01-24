## Dependencies instaladas

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




## Docker Image

# Imagen de un backend de nestjs

La imagen tiene estas variables

| Variable     | Ejemplo                    | Descripción                            |
| ------------ | -------------------------- | -------------------------------------- |
| PORT         | 3000                       | El puerto en el que va a correr la app |
| HOST_URL     | http ://localhost:3000/api | El url completo del api                |
| APP_VERSION  | 1.0.0                      | La version de al app                   |
| STAGE        | DEV                        | dev , prod, staging                    |
| DB_HOST      | localhost                  | host de la base de datos               |
| DB_PORT      | 5432                       | puerto de la base de datos             |
| DB_NAME      | nest-db                    | nombre de la base de datos             |
| DB_USERNAME  | postgres                   | usuario de la base de datos            |
| DB_PASSWORD  | 12345                      | contraseña de la base de datos         |
| JWT_SECRET   | averyrandomstring          | seed para el jwt                       |
| JWT_DURATION | 10h                        | duracion del token                     |

Los archivos de la app se alojan en `/app`, dentro de estas se encuentran la carpeta `public` y `static` para los archivos
