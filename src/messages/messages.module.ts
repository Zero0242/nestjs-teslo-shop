import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import { Message } from 'src/entities';
import { UsersModule } from 'src/users/users.module';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Module({
	imports: [AuthModule, UsersModule, TypeOrmModule.forFeature([Message])],
	controllers: [MessagesController],
	providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
