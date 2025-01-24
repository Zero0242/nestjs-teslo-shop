import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { ProductsModule } from 'src/products/products.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
	imports: [AuthModule, ProductsModule],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
