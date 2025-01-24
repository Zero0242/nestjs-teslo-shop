import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import { Notes } from 'src/entities';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Notes])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
