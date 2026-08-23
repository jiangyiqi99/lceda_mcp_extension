import {
	primitiveSnapshot,
	stateNumber,
	stateString,
	toPlainData,
} from '../utils/eda';
import {
	asRecord,
	CommandError,
	requiredNumber,
	requiredString,
} from '../utils/validation';

const COMPONENT_PROPERTIES = [
	'PrimitiveId', 'Designator', 'Name', 'X', 'Y', 'Rotation', 'Mirror', 'Net',
] as const;
const PIN_PROPERTIES = [
	'PrimitiveId', 'PinNumber', 'PinName', 'X', 'Y', 'Net', 'NoConnected',
] as const;
const WIRE_PROPERTIES = [
	'PrimitiveId', 'Line', 'Net', 'Color', 'LineWidth', 'LineType',
] as const;

export async function getSchematicInfo(): Promise<Record<string, unknown>> {
	const components = await eda.sch_PrimitiveComponent.getAll(undefined, false);
	const componentData = await Promise.all(components.map(async (component) => ({
		...primitiveSnapshot(component, COMPONENT_PROPERTIES),
		pins: (await component.getAllPins() ?? []).map(pin => primitiveSnapshot(pin, PIN_PROPERTIES)),
	})));
	const wires = await eda.sch_PrimitiveWire.getAll();
	const nets = await eda.sch_Net.getCurrentProjectAllNets();
	return {
		components: componentData,
		pins: componentData.flatMap(component => component.pins),
		nets: toPlainData(nets),
		wires: wires.map(wire => primitiveSnapshot(wire, WIRE_PROPERTIES)),
	};
}

export async function addSchematicComponent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const definition = asRecord(params.component, 'component');
	const libraryQuery = requiredString(definition, 'library');
	const reference = requiredString(definition, 'reference');
	const x = requiredNumber(definition, 'x');
	const y = requiredNumber(definition, 'y');
	const matches = await eda.lib_Device.search(libraryQuery);
	if (matches.length === 0) {
		throw new CommandError('LIBRARY_COMPONENT_NOT_FOUND', `${libraryQuery} was not found`);
	}

	const component = await eda.sch_PrimitiveComponent.create(matches[0], x, y);
	if (!component) {
		throw new CommandError('COMPONENT_CREATE_FAILED', `Could not create ${libraryQuery}`);
	}
	const updated = await eda.sch_PrimitiveComponent.modify(
		component.getState_PrimitiveId(),
		{ designator: reference },
	);
	return primitiveSnapshot(updated ?? component, COMPONENT_PROPERTIES);
}

export async function connectSchematicPins(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const from = parsePinAddress(requiredString(params, 'from'));
	const to = parsePinAddress(requiredString(params, 'to'));
	const components = await eda.sch_PrimitiveComponent.getAll(undefined, false);
	const fromComponent = components.find(
		component => stateString(component, 'Designator') === from.reference,
	);
	const toComponent = components.find(
		component => stateString(component, 'Designator') === to.reference,
	);
	if (!fromComponent || !toComponent) {
		throw new CommandError('INVALID_COMPONENT', 'One or both component references were not found');
	}

	const fromPin = (await fromComponent.getAllPins() ?? []).find(
		pin => stateString(pin, 'PinNumber') === from.pin,
	);
	const toPin = (await toComponent.getAllPins() ?? []).find(
		pin => stateString(pin, 'PinNumber') === to.pin,
	);
	if (!fromPin || !toPin) {
		throw new CommandError('INVALID_PIN', 'One or both component pins were not found');
	}

	const x1 = requireCoordinate(fromPin, 'X');
	const y1 = requireCoordinate(fromPin, 'Y');
	const x2 = requireCoordinate(toPin, 'X');
	const y2 = requireCoordinate(toPin, 'Y');
	const midpointX = (x1 + x2) / 2;
	const fromNet = stateString(fromPin, 'Net');
	const toNet = stateString(toPin, 'Net');
	if (fromNet && toNet && fromNet !== toNet) {
		throw new CommandError('NET_CONFLICT', `${fromNet} cannot be joined to ${toNet}`);
	}
	const wire = await eda.sch_PrimitiveWire.create(
		[x1, y1, midpointX, y1, midpointX, y2, x2, y2],
		fromNet ?? toNet,
	);
	if (!wire) {
		throw new CommandError('WIRE_CREATE_FAILED', 'JLCEDA did not create the wire');
	}
	return primitiveSnapshot(wire, WIRE_PROPERTIES);
}

function parsePinAddress(value: string): { reference: string; pin: string } {
	const separator = value.lastIndexOf('.');
	if (separator <= 0 || separator === value.length - 1) {
		throw new CommandError('INVALID_PIN_ADDRESS', `${value} must look like U1.1`);
	}
	return { reference: value.slice(0, separator), pin: value.slice(separator + 1) };
}

function requireCoordinate(pin: unknown, property: 'X' | 'Y'): number {
	const coordinate = stateNumber(pin, property);
	if (coordinate === undefined) {
		throw new CommandError('PIN_COORDINATE_UNAVAILABLE', `Pin ${property} is unavailable`);
	}
	return coordinate;
}
