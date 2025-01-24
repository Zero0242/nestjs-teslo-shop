import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import { Product, ProductImage } from 'src/entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [TypeOrmModule],
})
export class ProductsModule {}
