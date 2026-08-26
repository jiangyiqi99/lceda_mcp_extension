type DrcPrimitive = {
	primitiveId: string | null;
	designator: string | null;
	name: string | null;
	sheet: string | null;
};

type DrcViolation = {
	type: string;
	rule: string | null;
	net: string | null;
	primitives: DrcPrimitive[];
	count: number;
	message: string | null;
};

export async function runPcbDrc(): Promise<Record<string, unknown>> {
	const violations = await eda.pcb_Drc.check(true, false, true);
	return drcResult(violations);
}

export async function runSchematicDrc(): Promise<Record<string, unknown>> {
	const violations = await eda.sch_Drc.check(true, false, true);
	return drcResult(violations);
}

function drcResult(violations: unknown[]): Record<string, unknown> {
	const normalized = violations.map(normalizeDrcViolation);
	const warnings = normalized.filter(violation => isWarningType(violation.type));
	const errors = normalized.filter(violation => !isWarningType(violation.type));
	return { passed: normalized.length === 0, errors, warnings };
}

/**
 * Normalizes the documented schematic DRC shape and the less-structured PCB DRC
 * shape. Read fields from the live value before serialization so class accessors
 * cannot be silently discarded by JSON.stringify.
 */
function normalizeDrcViolation(value: unknown): DrcViolation {
	const record = asRecord(value);
	return {
		type: firstString(record, ['type', 'severity', 'level']) ?? 'error',
		rule: firstString(record, ['rule', 'ruleKey', 'ruleName']),
		net: firstString(record, ['net', 'netName']),
		primitives: arrayField(record, 'primitives').map(normalizeDrcPrimitive),
		count: firstNumber(record, ['count']) ?? 1,
		message: firstString(record, ['message', 'description', 'text']),
	};
}

function normalizeDrcPrimitive(value: unknown): DrcPrimitive {
	const record = asRecord(value);
	return {
		primitiveId: firstString(record, ['primitiveId', 'primitive_id', 'id']),
		designator: firstString(record, ['designator', 'reference']),
		name: firstString(record, ['name']),
		sheet: firstString(record, ['sheet', 'sheetId']),
	};
}

function asRecord(value: unknown): Record<string, unknown> {
	return typeof value === 'object' && value !== null
		? value as Record<string, unknown>
		: {};
}

function arrayField(record: Record<string, unknown>, field: string): unknown[] {
	const value = record[field];
	return Array.isArray(value) ? value : [];
}

function firstString(record: Record<string, unknown>, fields: string[]): string | null {
	for (const field of fields) {
		const value = record[field];
		if (typeof value === 'string') return value;
	}
	return null;
}

function firstNumber(record: Record<string, unknown>, fields: string[]): number | null {
	for (const field of fields) {
		const value = record[field];
		if (typeof value === 'number' && Number.isFinite(value)) return value;
	}
	return null;
}

function isWarningType(type: string): boolean {
	const normalized = type.trim().toLowerCase();
	return normalized === 'warn' || normalized === 'warning';
}
