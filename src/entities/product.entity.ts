import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true, default: [] })
  sizes: string[];

  @Column('text')
  gender: string;

  // tags
  @Column('text', { array: true, default: [] })
  tags: string[];

  // * Relaciones con otras tablas
  // images
  @OneToMany(() => ProductImage, (productimage) => productimage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  // * Interceptores de insercion
  @BeforeInsert()
  createSlug() {
    this.slug = this.slug ?? this.title;
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('"', '');
  }

  @BeforeUpdate()
  updateSlug() {
    this.createSlug();
  }

  @BeforeRemove()
  cleanData(){
    for (const image of this.images) {
      image.cleanImage()
    }
  }

  // * Metodos personalizados
  getPlainImages(): string[] {
    return this.images.map((image) => image.url);
  }
}
