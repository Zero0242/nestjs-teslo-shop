import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	message: string;

	@Column('text', { nullable: true })
	attachment?: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	// * ====================================
	// * Relaciones
	// * ====================================
	@ManyToOne(() => User, (user) => user.receivedMessages)
	from: User;

	@ManyToOne(() => User, (user) => user.sentMessages)
	to: User;
}
