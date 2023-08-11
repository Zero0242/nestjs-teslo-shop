import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private readonly logger = new Logger('Socket');
  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // * Emite unicamente al cliente
    /* client.emit('message-from-server', {
      fullName: 'John Server',
      message: payload.message || 'no message',
    }); */
    // ! Emitir a todos pero al cliente
    /* client.broadcast.emit('message-from-server', {
      fullName: 'John Server',
      message: payload.message || 'no message',
    }); */
    // ! Emitir a TODOS
    this.wss.emit('message-from-server', {
      fullName: 'John Server',
      message: payload.message || 'no message',
    });
  }
}
