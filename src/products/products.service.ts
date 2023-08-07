import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('Products Service');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return {
        data: product,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  // Todo: realizar paginado
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products: Product[] = await this.productRepository.find({
      take: limit,
      skip: offset,
      // Todo relaciones
    });
    return {
      data: products,
    };
  }

  // Todo: aceptar mas parametros para que sea flexible la busqueda
  async findOne(id: string) {
    try {
      const product: Product = await this.productRepository.findOneByOrFail({
        id,
      });
      return {
        data: product,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const { data } = await this.findOne(id);
    const response = await this.productRepository.remove(data);

    return {
      message: 'Removed succesfully',
      data: response,
    };
  }

  private handleDBException(error: any) {
    this.logger.error(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Unexpected error - check logs!');
  }
}
