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

export function optionalNumber(
	record: Record<string, unknown>,
	key: string,
	fallback?: number,
): number | undefined {
	const value = record[key];
	if (value === undefined || value === null) {
		return fallback;
	}
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		throw new CommandError('INVALID_PARAMS', `${key} must be a finite number`);
	}
	return value;
}

export function optionalBoolean(
	record: Record<string, unknown>,
	key: string,
	fallback: boolean,
): boolean {
	const value = record[key] ?? fallback;
	if (typeof value !== 'boolean') {
		throw new CommandError('INVALID_PARAMS', `${key} must be a boolean`);
	}
	return value;
}

export function requiredStringArray(
	record: Record<string, unknown>,
	key: string,
	options: { allowEmpty?: boolean } = {},
): string[] {
	const value = record[key];
	if (!Array.isArray(value) || (!options.allowEmpty && value.length === 0)) {
		throw new CommandError('INVALID_PARAMS', `${key} must be a non-empty string array`);
	}
	const strings = value.map((item, index) => {
		if (typeof item !== 'string' || item.trim() === '') {
			throw new CommandError(
				'INVALID_PARAMS',
				`${key}[${index}] must be a non-empty string`,
			);
		}
		return item.trim();
	});
	return strings;
}

export function optionalStringArray(
	record: Record<string, unknown>,
	key: string,
): string[] | undefined {
	return record[key] === undefined
		? undefined
		: requiredStringArray(record, key, { allowEmpty: true });
}

export function requiredPointArray(
	record: Record<string, unknown>,
	key: string,
	minimumLength = 1,
): Array<[number, number]> {
	const value = record[key];
	if (!Array.isArray(value) || value.length < minimumLength) {
		throw new CommandError(
			'INVALID_PARAMS',
			`${key} must contain at least ${minimumLength} coordinate pair(s)`,
		);
	}
	return value.map((item, index) => {
		if (
			!Array.isArray(item)
			|| item.length !== 2
			|| typeof item[0] !== 'number'
			|| !Number.isFinite(item[0])
			|| typeof item[1] !== 'number'
			|| !Number.isFinite(item[1])
		) {
			throw new CommandError(
				'INVALID_PARAMS',
				`${key}[${index}] must be [x, y] with finite numbers`,
			);
		}
		return [item[0], item[1]];
	});
}

export function optionalPointArray(
	record: Record<string, unknown>,
	key: string,
): Array<[number, number]> | undefined {
	return record[key] === undefined ? undefined : requiredPointArray(record, key, 0);
}

export function enumString<T extends string>(
	record: Record<string, unknown>,
	key: string,
	allowed: readonly T[],
	fallback?: T,
): T {
	const raw = record[key] ?? fallback;
	if (typeof raw !== 'string' || !allowed.includes(raw as T)) {
		throw new CommandError(
			'INVALID_PARAMS',
			`${key} must be one of: ${allowed.join(', ')}`,
		);
	}
	return raw as T;
}

export function optionalInteger(
	record: Record<string, unknown>,
	key: string,
	fallback: number,
	minimum: number,
	maximum: number,
): number {
	const value = record[key] ?? fallback;
	if (!Number.isInteger(value) || typeof value !== 'number' || value < minimum || value > maximum) {
		throw new CommandError(
			'INVALID_PARAMS',
			`${key} must be an integer between ${minimum} and ${maximum}`,
		);
	}
	return value;
}
