import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }

  private handleException(error: any) {
    this.logger.error(error);
    if (error.code === '23505')
      throw new BadRequestException(`Ha ocurrido un error: ${error.detail}`);
    throw new InternalServerErrorException('Llama al admin');
  }
}
