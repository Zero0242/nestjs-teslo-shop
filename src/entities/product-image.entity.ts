import {
  BeforeRemove,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { existsSync, unlinkSync } from 'fs';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;

  // * Acciones
  cleanImage() {
    const path = `./static/products/${this.url}`;
    if (existsSync(path)) {
      unlinkSync(path);
    }
  }
}
