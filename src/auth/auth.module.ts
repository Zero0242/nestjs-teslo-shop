import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt/jwt-strategy';

@Module({
	imports: [
		UsersModule,
		ConfigModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: config.get<string | number>('JWT_DURATION'),
				},
			}),
		}),
	],
	providers: [AuthService, JWTStrategy],
	controllers: [AuthController],
	// * Para el uso de AUTHGUARD en otros lados
	exports: [PassportModule, JwtModule],
})
export class AuthModule {}
