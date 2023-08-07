import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      //limits: { fileSize: 1024 },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadFile(
    @UploadedFile(ParseFilePipe)
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Make sure that file is an image');
    }

    const secureUrl =
      this.configService.get('HOST_API') + '/files/product/' + file.filename;

    return {
      secureUrl: secureUrl,
    };
  }

  @Get('product/:imageName')
  findOneImage(@Res() res: Response, @Param('imageName') image: string) {
    const path = this.filesService.getStaticProductImage(image);
    /* res.status(403).json({
      ok: false,
      path: path,
    }); */
    res.sendFile(path);
  }
}
