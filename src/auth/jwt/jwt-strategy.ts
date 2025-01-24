import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities';
import { UsersService } from 'src/users';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly users: UsersService,
		private readonly config: ConfigService,
	) {
		super({
			secretOrKey: config.get<string>('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { id } = payload;

		const user = await this.users.findById(id);

		if (!user) throw new UnauthorizedException('Token is invalid');
		if (user.isBlocked) {
			throw new UnauthorizedException('User has been blocked');
		}

		return user;
	}
}
