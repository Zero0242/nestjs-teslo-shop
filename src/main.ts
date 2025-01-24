import {
	ClassSerializerInterceptor,
	Logger,
	ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

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
