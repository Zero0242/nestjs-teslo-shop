import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileRenamer } from './helpers';

@ApiTags('files')
@Controller('files')
export class FilesController {
	constructor(
		private readonly filesService: FilesService,
		private readonly configService: ConfigService,
	) {}

	@Get('product/:imageName')
	findOneImage(@Param('imageName') imageName: string, @Res() res: Response) {
		const path = this.filesService.getStaticImage(imageName);

		return res.status(200).sendFile(path);
	}

	@Post('product')
	@UseInterceptors(
		FileInterceptor('archivo', {
			fileFilter: fileFilter,
			storage: diskStorage({
				destination: './static/products',
				filename: fileRenamer,
			}),
		}),
	)
	uploadProductImage(@UploadedFile() file: Express.Multer.File) {
		if (!file) throw new BadRequestException('Not a valid file');

		const hostname =
			this.configService.get<string>('HOST_API') ?? 'http://localhost:3000/api';

		const secureURL = `${hostname}/files/product/${file.filename}`;

		return { secureURL };
	}
}
