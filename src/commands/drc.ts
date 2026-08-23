import { toPlainData } from '../utils/eda';

export async function runPcbDrc(): Promise<Record<string, unknown>> {
	const violations = await eda.pcb_Drc.check(true, false, true);
	const plain = violations.map(item => toPlainData(item));
	const warnings = plain.filter(isWarning);
	const errors = plain.filter(item => !isWarning(item));
	return { passed: violations.length === 0, errors, warnings };
}

export async function runSchematicDrc(): Promise<Record<string, unknown>> {
	const violations = await eda.sch_Drc.check(true, false, true);
	const plain = violations.map(item => toPlainData(item));
	const warnings = plain.filter(isWarning);
	const errors = plain.filter(item => !isWarning(item));
	return { passed: violations.length === 0, errors, warnings };
}

function isWarning(value: unknown): boolean {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	const record = value as Record<string, unknown>;
	return [record.severity, record.level, record.type]
		.some(item => typeof item === 'string' && item.toLowerCase().includes('warning'));
}
