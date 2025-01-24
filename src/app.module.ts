import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { envs } from './common/helpers';
import { FilesModule } from './files/files.module';
import { MessagesModule } from './messages/messages.module';
import { ProductsModule } from './products/products.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: envs.DB_HOST,
			port: envs.DB_PORT,
			database: envs.DB_NAME,
			username: envs.DB_USERNAME,
			password: envs.DB_PASSWORD,
			// TODO: remover en builds de produccion
			autoLoadEntities: true,
			synchronize: true,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
		}),
		ScheduleModule.forRoot(),
		AuthModule,
		ProductsModule,
		CommonModule,
		FilesModule,
		MessagesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
