import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors();

  const PORT: number = +process.env.PORT;
  await app.listen(PORT, () =>
    new Logger('Bootstrap').log(`RUNNING ON PORT: ${PORT}`),
  );
}
bootstrap();
