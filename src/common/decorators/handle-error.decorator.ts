import {
	BadRequestException,
	HttpException,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';

/**
 * Maneja errores, con los codigos especiales de Typeorm
 * @param message Mensaje a retornar
 * @returns
 */
export function HandleError(message?: string, context?: string) {
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
				new Logger(context || 'HandleError').error(error);
				if (error instanceof HttpException) throw error;
				if (error?.code === '23505') {
					throw new BadRequestException(message ?? error?.detail);
				}
				if (error?.errno === 19) {
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
