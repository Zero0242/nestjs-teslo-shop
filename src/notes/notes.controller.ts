import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser, UseAuth } from 'src/auth';
import { User } from 'src/entities';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
	constructor(private readonly notesService: NotesService) {}

	@UseAuth()
	@Post()
	create(@GetUser() user: User, @Body() createNoteDto: CreateNoteDto) {
		return this.notesService.create(createNoteDto);
	}

	@Get()
	async findAll() {
		const messages = await this.notesService.findAll();
		return messages;
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.notesService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateNoteDto: UpdateNoteDto,
	) {
		return this.notesService.update(id, updateNoteDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.notesService.remove(id);
	}
}
