export type LogStyle = 'error' | 'table' | 'log';

export function CatchError(type: LogStyle = 'error') {
	return (
		target: Function,
		propertyKey: string,
		propertyDescriptor: PropertyDescriptor,
	) => {
		const originalFunction = propertyDescriptor.value;

		propertyDescriptor.value = async function (...args: any[]) {
			try {
				return await originalFunction.apply(this, args);
			} catch (error: unknown) {
				if (error instanceof Error) {
					errorHandler({ error, type, method: propertyKey });
				}
				throw error;
			}
		};

		return propertyDescriptor;
	};
}

interface Options {
	type: LogStyle;
	error: Error;
	method: string;
}

const errorHandler = ({ error, method, type }: Options) => {
	switch (type) {
		case 'error':
			const strError = JSON.stringify({ ...error }, null, 4);
			console.error(`[ ${method} ] : \n${strError}`);
			break;
		case 'table':
			console.log(`[ ${method} ]`);
			console.table({ ...error });
			break;
		default:
			console.log({ method, details: error });
			break;
	}
};
