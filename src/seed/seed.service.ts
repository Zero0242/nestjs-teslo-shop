import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './mock/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}
  async runSeed() {
    await this.insertProducts();
    return { ok: true, message: 'semilla ejecutada' };
  }

  private async insertProducts() {
    await this.productService.deleteAll();

    const { products } = initialData;

    /* const promises = products.map((data) => this.productService.create(data));

    await Promise.all(promises); */

    return true;
  }
}
