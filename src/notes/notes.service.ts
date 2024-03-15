import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@Injectable()
export class NotesService {
  private readonly logger = new Logger('NotesService');
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    return 'This action adds a new note';
  }

  findAll() {
    return this.notesRepository.find({});
  }

  findOne(id: string) {
    return this.notesRepository.find({ where: { id } });
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  async remove(id: string) {
    const { affected = 0 } = await this.notesRepository.delete(id);
    const ok = affected !== 0;
    return { ok, message: ok ? 'Eliminado con exito' : 'No encontrado' };
  }
}
