import {
  ExecutionContext,
  ImATeapotException,
  createParamDecorator,
} from '@nestjs/common';

export const RawHeader = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  const header = req.rawHeaders;

  if (!header) throw new ImATeapotException('you fucked up :)');

  return header;
});
