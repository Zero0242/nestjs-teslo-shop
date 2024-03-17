import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
import { Product, ProductImage, User } from 'src/entities';
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
    private readonly datasource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images = [], ...rest } = createProductDto;
      const product = this.productRepository.create({
        ...rest,
        user,
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

  // QUERY RUNNER, MODO SQL
  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images, ...partial } = updateProductDto;
    // * Precarga el product con el id, junto a los parametros que le pasamos
    const product = await this.productRepository.preload({ id, ...partial });

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    // * Crear query runner
    const runner = this.datasource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();

    try {
      // * Guardando desde el save

      if (images) {
        // * Borra todos los products, con id id
        await runner.manager.delete(ProductImage, { product: { id } });
        product.images = images.map((image) =>
          this.productImageRespository.create({ url: image }),
        );
      }
      product.user = user;

      // * Intentar grabar el producto
      await runner.manager.save(product);
      // * Tira la transaccion
      await runner.commitTransaction();
      // * Nos desconecta
      await runner.release();
      return this.findOne(id);
    } catch (error) {
      await runner.rollbackTransaction();
      this.handleException(error);
    }
  }

  async remove(id: string, user: User) {
    const product = await this.findOne(id);
    if (product.user.id !== user.id) {
      throw new BadRequestException('No se puede completar esta operacion');
    }
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

  // ! FUNCION DESTRUCTORA
  async deleteAll() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleException(error);
    }
  }
}
