import { Logger } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import type { Socket } from 'socket.io';
import type { JwtPayload } from 'src/auth/interfaces';
import type { MessagesService } from '../messages.service';

type SocketMiddleware = (event: Socket, next: (err?: Error) => void) => void;

export const AuthWsMiddleware = (
	jwtService: JwtService,
	messageService: MessagesService,
): SocketMiddleware => {
	return async (client: Socket, next) => {
		try {
			const { auth, headers } = client.handshake;
			const token = auth['x-token'] ?? headers['x-token'];
			if (!token) throw new Error('Authorization token is missing');

			const jwtPayload = jwtService.decode<JwtPayload>(token);

			if (!jwtPayload) throw new Error('Invalid JWT');

			const uid = jwtPayload.id;
			const user = await messageService.connectUser(uid);

			if (!user) throw new Error('User does not exist!');
			client = Object.assign(client, { user: user! });
			next();
		} catch (error) {
			Logger.error(error, 'WS-AuthMiddleware');
			client.disconnect();
			next(new Error(error?.message ?? 'Error de conexión'));
		}
	};
};
