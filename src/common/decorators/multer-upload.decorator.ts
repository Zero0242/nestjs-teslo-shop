import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileType, MulterUtils } from '../helpers';

interface Options {
  destination: string;
  fileType?: FileType;
}

export const MulterUpload = (
  fieldname: string,
  { destination, fileType }: Options,
) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldname, {
        fileFilter: MulterUtils.filter(fileType),
        // * 10 mb
        limits: { fileSize: 10 * 1024 * 1024 },
        storage: diskStorage({
          destination: destination,
          filename: MulterUtils.uuidName,
        }),
      }),
    ),
  );
};
