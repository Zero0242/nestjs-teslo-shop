export function ReturnLogger() {
	return (
		target: Function,
		propertyKey: string,
		propertyDescriptor: PropertyDescriptor,
	) => {
		const originalFunction = propertyDescriptor.value;

		propertyDescriptor.value = async function (...args: any[]) {
			const value = await originalFunction.apply(this, args);
			console.log(`[ ${propertyKey} ] : ${value}`);
			return value;
		};

		return propertyDescriptor;
	};
}
