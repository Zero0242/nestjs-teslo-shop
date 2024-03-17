import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { default: '' })
  phone: string;

  @Column('date', { nullable: true })
  birthday: Date;

  @Column('text')
  password: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @CreateDateColumn()
  createdAt: Date;

  // * Relaciones con tablas

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
