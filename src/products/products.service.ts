import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
import { Product, ProductImage } from 'src/entities';
import { PaginationDto } from 'src/common/dtos';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRespository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...rest } = createProductDto;
      const product = this.productRepository.create({
        ...rest,
        images: images.map((image) =>
          this.productImageRespository.create({ url: image }),
        ),
      });

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDTO;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: { images: true },
    });

    return products.map((product) => ({
      ...product,
      images: product.getPlainImages(),
    }));
  }

  async findOne(term: string) {
    let product: Product;
    if (isUUID(term)) {
      product = await this.productRepository.findOne({ where: { id: term } });
    } else {
      //product = await this.productRepository.findOne({ where: { slug: term } });
      // * Query builder, modo manual para las querys SQL + Alias de la tabla
      const queryBuilder =
        this.productRepository.createQueryBuilder('products');

      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        // * Para hacer el join con la tabla imagenes
        .leftJoinAndSelect('products.images', 'prodImages')
        .getOne();
    }

    if (!product) {
      throw new NotFoundException(`Product with term: ${term} not found`);
    }

    return { ...product, images: product.getPlainImages() };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // * Precarga el product con el id, junto a los parametros que le pasamos
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
      images: [],
    });

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    try {
      // * Guardando desde el save
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleException(error);
    }
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
