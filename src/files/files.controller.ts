import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MulterUpload } from 'src/common/decorators';
import { envs, FileType } from 'src/common/helpers';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get('product/:imageName')
	findOneImage(@Param('imageName') imageName: string, @Res() res: Response) {
		const path = this.filesService.getStaticImage(imageName);

		return res.status(200).sendFile(path);
	}

	@Post('product')
	@MulterUpload('archivo', {
		destination: './static/products',
		fileType: FileType.IMAGE,
	})
	uploadProductImage(@UploadedFile() file: Express.Multer.File) {
		if (!file) throw new BadRequestException('Not a valid file');

		const hostname = envs.HOST_URL ?? 'http://localhost:3000/api';

		const secureURL = `${hostname}/files/product/${file.filename}`;

		return { secureURL };
	}
}
