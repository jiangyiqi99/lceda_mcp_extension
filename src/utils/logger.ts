const PREFIX = '[JLCEDA-AI]';

export const logger = {
	info(message: string, ...data: unknown[]): void {
		console.info(PREFIX, message, ...data);
	},
	warn(message: string, ...data: unknown[]): void {
		console.warn(PREFIX, message, ...data);
	},
	error(message: string, ...data: unknown[]): void {
		console.error(PREFIX, message, ...data);
	},
};

