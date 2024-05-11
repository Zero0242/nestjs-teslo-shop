import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
	);

	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle('Teslo Shop')
		.setDescription('Backend de nestjs')
		.addBearerAuth()
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	const PORT: number = +process.env.PORT;
	await app.listen(PORT, () =>
		new Logger('Bootstrap').log(`RUNNING ON PORT: ${PORT}`),
	);
}
bootstrap();
