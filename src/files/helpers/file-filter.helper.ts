type CallBack = (error: Error, acceptFile: boolean) => void;

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: CallBack,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const [_, fileExtension] = file.mimetype.split('/');

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (allowedExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  return callback(null, false);
};
