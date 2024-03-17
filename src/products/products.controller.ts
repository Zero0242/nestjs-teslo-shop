import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common/dtos';
import { GetUser, UseAuth } from 'src/auth';
import { User } from 'src/entities';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseAuth()
  create(
    @GetUser() user: User,
    @Body()
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.productsService.findAll(paginationDTO);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    return product;
  }

  @Patch(':id')
  @UseAuth()
  update(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @UseAuth()
  remove(@GetUser() user: User, @Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id, user);
  }
}
