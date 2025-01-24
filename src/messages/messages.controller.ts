import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser, UseAuth } from 'src/auth/decorators';
import { MessagesService } from './messages.service';

@UseAuth()
@ApiTags('mensajes')
@Controller('mensajes')
export class MessagesController {
	constructor(private readonly messageService: MessagesService) {}

	@Get(':from')
	obtenerMensajes(
		@Param('from', ParseUUIDPipe) fromId: string,
		@GetUser('id') id: string,
	) {
		return this.messageService.getMessages(id, fromId);
	}
}
