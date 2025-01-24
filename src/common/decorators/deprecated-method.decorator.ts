export function Deprecated() {
	return (
		target: any,
		propertyKey: string,

		propertyDescriptor: PropertyDescriptor,
	) => {
		const originalFunction = propertyDescriptor.value;
		propertyDescriptor.value = async function (...args: any[]) {
			console.warn(
				`[ ${propertyKey}() ]: is deprecated and will be removed in a future version.`,
			);
			return await originalFunction.apply(this, args);
		};

		return propertyDescriptor;
	};
}
