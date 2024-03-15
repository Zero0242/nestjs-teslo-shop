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
import { PaginationDto } from 'src/common/dtos';

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

  findAll(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDTO;
    return this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    });
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const { affected = 0 } = await this.productRepository.delete(id);
    const ok = affected !== 0;
    return { ok, message: ok ? 'Eliminado con exito' : 'No encontrado' };
  }

  private handleException(error: any) {
    this.logger.error(error);
    if (error.code === '23505')
      throw new BadRequestException(`Ha ocurrido un error: ${error.detail}`);
    throw new InternalServerErrorException('Llama al admin');
  }
}
