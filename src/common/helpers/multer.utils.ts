import * as path from 'path';
import { v4 as uuid } from 'uuid';

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  OTHER = 'other',
}

export class MulterUtils {
  public static uuidName(
    _: Express.Request,
    file: Express.Multer.File,
    cb: any,
  ) {
    const ext = path.extname(file.originalname);
    const filename = uuid() + ext;
    cb(null, filename);
  }

  public static filter = (fileType?: FileType) => {
    return (_: Express.Request, file: Express.Multer.File, cb: any) => {
      if (!fileType) return cb(null, true);

      const mimeTypes: { [key in FileType]: string[] } = {
        [FileType.IMAGE]: ['image/jpeg', 'image/png', 'image/gif'],
        [FileType.VIDEO]: ['video/mp4', 'video/mpeg', 'video/quicktime'],
        [FileType.DOCUMENT]: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        [FileType.OTHER]: [],
      };

      if (mimeTypes[fileType].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'), false);
      }
    };
  };
}
