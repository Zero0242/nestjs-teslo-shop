import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/entities';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(Message)
		private readonly messageRepository: Repository<Message>,
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly usersService: UsersService,
	) {}

	async getMessages(uid: string, fromId: string): Promise<Message[]> {
		const query = this.messageRepository
			.createQueryBuilder()
			.where(` "fromId" = :fromId `, { fromId })
			.orWhere(` "fromId" = :fromId `, { toId: uid })
			.orWhere(` "toId" = :toId `, { toId: uid })
			.orWhere(` "toId" = :toId `, { toId: fromId })
			.addOrderBy(' created_at ', 'DESC')
			.limit(30);
		return await query.getMany();
	}

	async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
		const [from, to] = await Promise.all([
			this.usersService.findById(createMessageDto.from),
			this.usersService.findById(createMessageDto.to),
		]);
		const message = this.messageRepository.create({
			from,
			message: createMessageDto.message,
			to,
		});

		return await this.messageRepository.save(message);
	}

	async getConnectedUsers() {
		const query = this.usersRepository
			.createQueryBuilder()
			.addOrderBy('online', 'ASC');
		const result = await query.getMany();
		return result.map((e) => instanceToPlain(e));
	}

	async connectUser(id: string): Promise<User> {
		const user = await this.usersService.findById(id);
		user.online = true;
		return await this.usersRepository.save(user);
	}

	async disconnectUser(id: string): Promise<User> {
		const user = await this.usersService.findById(id);
		user.online = false;
		return await this.usersRepository.save(user);
	}
}
