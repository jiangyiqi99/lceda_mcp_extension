export class CommandError extends Error {
	constructor(
		public readonly code: string,
		message: string,
		public readonly data?: unknown,
	) {
		super(message);
		this.name = 'CommandError';
	}
}

export function asRecord(value: unknown, label = 'params'): Record<string, unknown> {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		throw new CommandError('INVALID_PARAMS', `${label} must be an object`);
	}
	return value as Record<string, unknown>;
}

export function requiredString(record: Record<string, unknown>, key: string): string {
	const value = record[key];
	if (typeof value !== 'string' || value.trim() === '') {
		throw new CommandError('INVALID_PARAMS', `${key} must be a non-empty string`);
	}
	return value.trim();
}

export function optionalString(
	record: Record<string, unknown>,
	key: string,
	fallback: string,
): string {
	const value = record[key];
	return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback;
}

export function requiredNumber(record: Record<string, unknown>, key: string): number {
	const value = record[key];
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		throw new CommandError('INVALID_PARAMS', `${key} must be a finite number`);
	}
	return value;
}

