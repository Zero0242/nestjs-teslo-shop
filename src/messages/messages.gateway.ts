import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { User } from 'src/entities';
import { CreateMessageDto } from './dto';
import { MessagesService } from './messages.service';
import { AuthWsMiddleware } from './middleware/auth-ws.middleware';

interface AuthSocket extends Socket {
	user: User;
}

@WebSocketGateway({ namespace: 'chat' })
export class MessagesGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	private readonly server: Server;
	private readonly logger = new Logger('MessagesGateway');

	constructor(
		private readonly messagesService: MessagesService,
		private readonly jwtService: JwtService,
	) {}

	// # Inicio del server, o sea cuando esta listo el endpoint para conexiones
	afterInit() {
		this.server.use(AuthWsMiddleware(this.jwtService, this.messagesService));
		this.logger.log('Guard Aplicado');
	}

	// # Inicio de conexion
	async handleConnection(@ConnectedSocket() client: AuthSocket) {
		const { id } = client.user;
		this.logger.log(`Conectado: ${id}`);
		client.join(id);

		this.server.emit(
			'chat:usuarios',
			await this.messagesService.getConnectedUsers(),
		);
	}

	// # Inicio de desconexion
	async handleDisconnect(@ConnectedSocket() client: AuthSocket) {
		const { id } = client.user;
		this.logger.log(`Desconectado: ${id}`);
		await this.messagesService.disconnectUser(id);
		this.server.emit(
			'chat:usuarios',
			await this.messagesService.getConnectedUsers(),
		);
	}

	@SubscribeMessage('chat:mensaje-personal')
	async onMessageSent(@MessageBody() createMessageDto: CreateMessageDto) {
		const mensaje = await this.messagesService.createMessage(createMessageDto);
		console.log({ createMessageDto, mensaje });

		this.server
			.to(createMessageDto.to)
			.to(createMessageDto.from)
			.emit('chat:mensaje-personal', {
				id: mensaje.id,
				senderId: createMessageDto.from,
				recipientId: createMessageDto.to,
				message: createMessageDto.message,
				...mensaje,
			});
	}
}
