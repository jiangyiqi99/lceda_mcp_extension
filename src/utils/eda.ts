export function state(value: unknown, property: string): unknown {
	if ((typeof value !== 'object' && typeof value !== 'function') || value === null) {
		return undefined;
	}
	const getter = Reflect.get(value, `getState_${property}`);
	return typeof getter === 'function' ? Reflect.apply(getter, value, []) : undefined;
}

export function stateString(value: unknown, property: string): string | undefined {
	const result = state(value, property);
	return typeof result === 'string' ? result : undefined;
}

export function stateNumber(value: unknown, property: string): number | undefined {
	const result = state(value, property);
	return typeof result === 'number' ? result : undefined;
}

export function primitiveSnapshot(
	value: unknown,
	properties: readonly string[],
): Record<string, unknown> {
	const output: Record<string, unknown> = {};
	for (const property of properties) {
		const result = state(value, property);
		if (result !== undefined) {
			output[property.charAt(0).toLowerCase() + property.slice(1)] = toPlainData(result);
		}
	}
	return output;
}

export function toPlainData(value: unknown): unknown {
	if (value === undefined || value === null || typeof value !== 'object') {
		return value;
	}
	try {
		return JSON.parse(JSON.stringify(value)) as unknown;
	}
	catch {
		return String(value);
	}
}

export function delay(milliseconds: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

