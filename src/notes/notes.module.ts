import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
