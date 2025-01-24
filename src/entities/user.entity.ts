import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { Product } from './product.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	username: string;

	@Column('text', { unique: true })
	email: string;

	@Column({ default: false })
	online: boolean;

	@Column({ default: false })
	isBlocked: boolean;

	@Column('text', { default: '' })
	phone: string;

	@Column('date', { nullable: true })
	birthday: Date;

	@Exclude({ toPlainOnly: true })
	@Column('text')
	password: string;

	@Column('text', { array: true, default: ['user'] })
	roles: string[];

	@CreateDateColumn()
	createdAt: Date;

	// * Relaciones con tablas

	@OneToMany(() => Product, (product) => product.user)
	products: Product[];

	@OneToMany(() => Message, (message) => message.to)
	sentMessages: Message[];

	@OneToMany(() => Message, (message) => message.from)
	receivedMessages: Message[];
}
