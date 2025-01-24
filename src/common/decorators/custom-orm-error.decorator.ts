import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

/**
 * Genera un log especial de la funcion de Typeorm
 * @param message Mensaje a retornar
 * @returns
 */
export function CustomOrmError(message?: string) {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const originalFunction = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalFunction.apply(this, args);
      } catch (error) {
        Logger.error(error, 'CustomOrmError');
        if (error instanceof HttpException) throw error;
        if (error?.code === '23505') {
          throw new BadRequestException(message ?? error?.detail);
        }
        throw new InternalServerErrorException(
          message ?? 'Something went wrong with the operation',
        );
      }
    };

    return propertyDescriptor;
  };
}
