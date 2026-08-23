import {
	primitiveSnapshot,
	state,
	stateNumber,
	stateString,
	toPlainData,
} from '../utils/eda';
import {
	asRecord,
	CommandError,
	enumString,
	optionalBoolean,
	optionalInteger,
	optionalNumber,
	optionalPointArray,
	optionalString,
	optionalStringArray,
	requiredPointArray,
	requiredNumber,
	requiredString,
	requiredStringArray,
} from '../utils/validation';

const COMPONENT_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'ComponentType', 'Designator', 'Name', 'X', 'Y',
	'Rotation', 'Mirror', 'Net', 'AddIntoBom', 'AddIntoPcb',
] as const;
const PIN_PROPERTIES = [
	'PrimitiveId', 'PinNumber', 'PinName', 'X', 'Y', 'Net', 'NoConnected',
] as const;
const WIRE_PROPERTIES = [
	'PrimitiveId', 'Line', 'Net', 'Color', 'LineWidth', 'LineType',
] as const;
const ATTRIBUTE_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'X', 'Y', 'Net', 'Key', 'Value',
] as const;

type Point = [number, number];
type Segment = [Point, Point];

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
	const placed = await createSchematicComponent(
		matches[0].libraryUuid,
		matches[0].uuid,
		reference,
		x,
		y,
	);
	return placed.component;
}

export async function searchComponents(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const query = requiredString(params, 'query');
	const page = optionalInteger(params, 'page', 1, 1, Number.MAX_SAFE_INTEGER);
	const pageSize = optionalInteger(params, 'page_size', 20, 1, 100);
	const matches = await eda.lib_Device.search(
		query,
		undefined,
		undefined,
		undefined,
		pageSize,
		page,
	);
	const candidates = matches.map(match => ({
		library_uuid: match.libraryUuid,
		device_uuid: match.uuid,
		name: match.name,
		description: match.description,
		classification: toPlainData(match.classification),
		ordinal: match.ordinal,
		symbol: toPlainData(match.symbol),
		footprint: toPlainData(match.footprint),
		model_3d: toPlainData(match.model3D),
		image_uuid: toPlainData(match.imageUuid),
		properties: toPlainData(match.otherProperty),
	}));
	return {
		query,
		page,
		page_size: pageSize,
		returned: candidates.length,
		has_more: candidates.length === pageSize,
		candidates,
	};
}

export async function placeSchematicComponent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	return createSchematicComponent(
		requiredString(params, 'library_uuid'),
		requiredString(params, 'device_uuid'),
		requiredString(params, 'reference'),
		requiredNumber(params, 'x'),
		requiredNumber(params, 'y'),
	);
}

export async function modifySchematicComponent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const reference = requiredString(params, 'reference');
	const component = await findComponent(reference);
	const property: {
		x?: number;
		y?: number;
		rotation?: number;
		mirror?: boolean;
		designator?: string;
		name?: string;
		addIntoBom?: boolean;
		addIntoPcb?: boolean;
	} = {};
	const x = optionalNumber(params, 'x');
	const y = optionalNumber(params, 'y');
	const rotation = optionalNumber(params, 'rotation');
	if (x !== undefined) property.x = x;
	if (y !== undefined) property.y = y;
	if (rotation !== undefined) property.rotation = rotation;
	if (params.mirror !== undefined) property.mirror = optionalBoolean(params, 'mirror', false);
	if (params.new_reference !== undefined) {
		property.designator = requiredString(params, 'new_reference');
	}
	if (params.name !== undefined) property.name = requiredString(params, 'name');
	if (params.add_into_bom !== undefined) {
		property.addIntoBom = optionalBoolean(params, 'add_into_bom', true);
	}
	if (params.add_into_pcb !== undefined) {
		property.addIntoPcb = optionalBoolean(params, 'add_into_pcb', true);
	}
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one component property is required');
	}
	const updated = await eda.sch_PrimitiveComponent.modify(
		component.getState_PrimitiveId(),
		property,
	);
	if (!updated) {
		throw new CommandError('COMPONENT_MODIFY_FAILED', `${reference} could not be modified`);
	}
	return primitiveSnapshot(updated, COMPONENT_PROPERTIES);
}

export async function deleteSchematicComponents(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const references = optionalStringArray(params, 'references') ?? [];
	const primitiveIds = optionalStringArray(params, 'primitive_ids') ?? [];
	if (references.length === 0 && primitiveIds.length === 0) {
		throw new CommandError(
			'INVALID_PARAMS',
			'references or primitive_ids must contain at least one target',
		);
	}
	const components = await eda.sch_PrimitiveComponent.getAll(undefined, false);
	const resolvedIds = components
		.filter(component => references.includes(stateString(component, 'Designator') ?? ''))
		.map(component => component.getState_PrimitiveId());
	const ids = [...new Set([...primitiveIds, ...resolvedIds])];
	if (ids.length === 0) {
		throw new CommandError('INVALID_COMPONENT', 'No matching schematic components were found');
	}
	const deleted = await eda.sch_PrimitiveComponent.delete(ids);
	return { deleted, primitive_ids: ids };
}

export async function deleteSchematicWires(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveIds = optionalStringArray(params, 'primitive_ids') ?? [];
	const nets = optionalStringArray(params, 'nets') ?? [];
	if (primitiveIds.length === 0 && nets.length === 0) {
		throw new CommandError(
			'INVALID_PARAMS',
			'primitive_ids or nets must contain at least one target',
		);
	}
	const wires = await eda.sch_PrimitiveWire.getAll();
	const resolvedIds = wires
		.filter(wire => nets.includes(stateString(wire, 'Net') ?? ''))
		.map(wire => wire.getState_PrimitiveId());
	const ids = [...new Set([...primitiveIds, ...resolvedIds])];
	if (ids.length === 0) {
		throw new CommandError('INVALID_WIRE', 'No matching schematic wires were found');
	}
	const deleted = await eda.sch_PrimitiveWire.delete(ids);
	return { deleted, primitive_ids: ids };
}

export async function modifySchematicWire(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveId = requiredString(params, 'primitive_id');
	const property: {
		line?: number[];
		net?: string;
		color?: string;
		lineWidth?: number;
		lineType?: ESCH_PrimitiveLineType;
	} = {};
	if (params.points !== undefined) {
		const points = requiredPointArray(params, 'points', 2);
		await validateWirePath(
			points,
			params.net === undefined ? '' : requiredString(params, 'net'),
			optionalBoolean(params, 'allow_crossings', false),
			primitiveId,
		);
		property.line = flattenPoints(points);
	}
	if (params.net !== undefined) property.net = requiredString(params, 'net');
	if (params.color !== undefined) property.color = requiredString(params, 'color');
	const lineWidth = optionalNumber(params, 'line_width');
	if (lineWidth !== undefined) property.lineWidth = lineWidth;
	if (params.line_type !== undefined) {
		property.lineType = optionalInteger(params, 'line_type', 0, 0, 3) as ESCH_PrimitiveLineType;
	}
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one wire property is required');
	}
	const wire = await eda.sch_PrimitiveWire.modify(primitiveId, property);
	if (!wire) throw new CommandError('WIRE_MODIFY_FAILED', primitiveId);
	return primitiveSnapshot(wire, WIRE_PROPERTIES);
}

export async function setSchematicPinNoConnect(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const address = parsePinAddress(requiredString(params, 'pin'));
	const pin = await findPin(address);
	const updated = await eda.sch_PrimitivePin.modify(
		pin,
		{ noConnected: optionalBoolean(params, 'no_connected', true) },
	);
	if (!updated) throw new CommandError('PIN_MODIFY_FAILED', params.pin as string);
	return primitiveSnapshot(updated, PIN_PROPERTIES);
}

export async function clearSchematic(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const includeWires = optionalBoolean(params, 'include_wires', true);
	const includeComponents = optionalBoolean(params, 'include_components', true);
	const wires = includeWires ? await eda.sch_PrimitiveWire.getAll() : [];
	const components = includeComponents
		? await eda.sch_PrimitiveComponent.getAll(undefined, false)
		: [];
	const componentIds: string[] = [];
	for (const component of components) {
		const pins = await component.getAllPins() ?? [];
		const designator = stateString(component, 'Designator')?.trim();
		const net = stateString(component, 'Net')?.trim();
		// Preserve the sheet frame/title block, which is reported as an empty component.
		if (pins.length > 0 || designator || net) {
			componentIds.push(component.getState_PrimitiveId());
		}
	}
	const wireIds = wires.map(wire => wire.getState_PrimitiveId());
	const wiresDeleted = wireIds.length === 0
		? true
		: await eda.sch_PrimitiveWire.delete(wireIds);
	const componentsDeleted = componentIds.length === 0
		? true
		: await eda.sch_PrimitiveComponent.delete(componentIds);
	return {
		wires_deleted: wiresDeleted,
		wire_count: wireIds.length,
		components_deleted: componentsDeleted,
		component_count: componentIds.length,
		preserved_empty_components: components.length - componentIds.length,
	};
}

export async function createSchematicNetFlag(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const kind = enumString(
		params,
		'kind',
		['Power', 'Ground', 'AnalogGround', 'ProtectGround'] as const,
	);
	const flag = await eda.sch_PrimitiveComponent.createNetFlag(
		kind,
		requiredString(params, 'net'),
		requiredNumber(params, 'x'),
		requiredNumber(params, 'y'),
		optionalNumber(params, 'rotation', 0),
		optionalBoolean(params, 'mirror', false),
	);
	if (!flag) {
		throw new CommandError('NET_FLAG_CREATE_FAILED', 'JLCEDA did not create the net flag');
	}
	return primitiveSnapshot(flag, COMPONENT_PROPERTIES);
}

export async function createSchematicNetPort(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const direction = enumString(params, 'direction', ['IN', 'OUT', 'BI'] as const, 'BI');
	const port = await eda.sch_PrimitiveComponent.createNetPort(
		direction,
		requiredString(params, 'net'),
		requiredNumber(params, 'x'),
		requiredNumber(params, 'y'),
		optionalNumber(params, 'rotation', 0),
		optionalBoolean(params, 'mirror', false),
	);
	if (!port) {
		throw new CommandError('NET_PORT_CREATE_FAILED', 'JLCEDA did not create the net port');
	}
	return primitiveSnapshot(port, COMPONENT_PROPERTIES);
}

export async function createSchematicNetLabel(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const label = await eda.sch_PrimitiveAttribute.createNetLabel(
		requiredNumber(params, 'x'),
		requiredNumber(params, 'y'),
		requiredString(params, 'net'),
	);
	if (!label) {
		throw new CommandError('NET_LABEL_CREATE_FAILED', 'JLCEDA did not create the net label');
	}
	return primitiveSnapshot(label, ATTRIBUTE_PROPERTIES);
}

export async function connectSchematicNet(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const net = requiredString(params, 'net');
	const pins = requiredStringArray(params, 'pins');
	const style = enumString(
		params,
		'style',
		['port', 'power', 'ground', 'analog_ground', 'protect_ground', 'label'] as const,
		'port',
	);
	const created: Record<string, unknown>[] = [];
	for (const address of pins) {
		const pin = await findPin(parsePinAddress(address));
		const x = requireCoordinate(pin, 'X');
		const y = requireCoordinate(pin, 'Y');
		if (style === 'label') {
			const label = await eda.sch_PrimitiveAttribute.createNetLabel(x, y, net);
			if (!label) throw new CommandError('NET_LABEL_CREATE_FAILED', address);
			created.push(primitiveSnapshot(label, ATTRIBUTE_PROPERTIES));
		}
		else if (style === 'port') {
			const port = await eda.sch_PrimitiveComponent.createNetPort('BI', net, x, y);
			if (!port) throw new CommandError('NET_PORT_CREATE_FAILED', address);
			created.push(primitiveSnapshot(port, COMPONENT_PROPERTIES));
		}
		else {
			const kind = {
				power: 'Power',
				ground: 'Ground',
				analog_ground: 'AnalogGround',
				protect_ground: 'ProtectGround',
			}[style] as 'Power' | 'Ground' | 'AnalogGround' | 'ProtectGround';
			const flag = await eda.sch_PrimitiveComponent.createNetFlag(kind, net, x, y);
			if (!flag) throw new CommandError('NET_FLAG_CREATE_FAILED', address);
			created.push(primitiveSnapshot(flag, COMPONENT_PROPERTIES));
		}
	}
	return { net, style, pins, created };
}

export async function createSchematicWire(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const points = requiredPointArray(params, 'points', 2);
	const net = optionalString(params, 'net', '');
	await validateWirePath(
		points,
		net,
		optionalBoolean(params, 'allow_crossings', false),
	);
	const wire = await eda.sch_PrimitiveWire.create(flattenPoints(points), net || undefined);
	if (!wire) {
		throw new CommandError('WIRE_CREATE_FAILED', 'JLCEDA did not create the wire');
	}
	return primitiveSnapshot(wire, WIRE_PROPERTIES);
}

async function createSchematicComponent(
	libraryUuid: string,
	deviceUuid: string,
	reference: string,
	x: number,
	y: number,
): Promise<{
	library_uuid: string;
	device_uuid: string;
	component: Record<string, unknown>;
}> {
	const component = await eda.sch_PrimitiveComponent.create(
		{ libraryUuid, uuid: deviceUuid },
		x,
		y,
	);
	if (!component) {
		throw new CommandError('COMPONENT_CREATE_FAILED', `Could not create ${deviceUuid}`);
	}
	const updated = await eda.sch_PrimitiveComponent.modify(
		component.getState_PrimitiveId(),
		{ designator: reference },
	);
	return {
		library_uuid: libraryUuid,
		device_uuid: deviceUuid,
		component: primitiveSnapshot(updated ?? component, COMPONENT_PROPERTIES),
	};
}

export async function connectSchematicPins(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const from = parsePinAddress(requiredString(params, 'from'));
	const to = parsePinAddress(requiredString(params, 'to'));
	const fromPin = await findPin(from);
	const toPin = await findPin(to);

	const x1 = requireCoordinate(fromPin, 'X');
	const y1 = requireCoordinate(fromPin, 'Y');
	const x2 = requireCoordinate(toPin, 'X');
	const y2 = requireCoordinate(toPin, 'Y');
	const fromNet = stateString(fromPin, 'Net')?.trim() || undefined;
	const toNet = stateString(toPin, 'Net')?.trim() || undefined;
	if (fromNet && toNet && fromNet !== toNet) {
		throw new CommandError('NET_CONFLICT', `${fromNet} cannot be joined to ${toNet}`);
	}
	const explicitNet = params.net === undefined ? undefined : requiredString(params, 'net');
	const net = explicitNet ?? fromNet ?? toNet ?? generatedNetName(from, to);
	const waypoints = optionalPointArray(params, 'waypoints') ?? [];
	const points: Point[] = [[x1, y1], ...waypoints, [x2, y2]];
	if (waypoints.length === 0 && x1 !== x2 && y1 !== y2) {
		points.splice(1, 0, [x2, y1]);
	}
	await validateWirePath(
		points,
		net,
		optionalBoolean(params, 'allow_crossings', false),
	);
	const wire = await eda.sch_PrimitiveWire.create(
		flattenPoints(points),
		net,
	);
	if (!wire) {
		throw new CommandError('WIRE_CREATE_FAILED', 'JLCEDA did not create the wire');
	}
	return primitiveSnapshot(wire, WIRE_PROPERTIES);
}

export async function getSchematicNetlist(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const format = optionalString(params, 'format', 'Protel2');
	const netlist = await eda.sch_Netlist.getNetlist(format as ESYS_NetlistType);
	return { format, netlist };
}

export async function autoLayoutSchematic(): Promise<unknown> {
	return toPlainData(await eda.sch_Document.autoLayout());
}

export async function autoRouteSchematic(): Promise<unknown> {
	return toPlainData(await eda.sch_Document.autoRouting());
}

function generatedNetName(
	from: { reference: string; pin: string },
	to: { reference: string; pin: string },
): string {
	const endpoint = (value: string): string => value.replace(/[^A-Za-z0-9_]/g, '_');
	return `AI_${endpoint(from.reference)}_${endpoint(from.pin)}_${endpoint(to.reference)}_${endpoint(to.pin)}`;
}

function parsePinAddress(value: string): { reference: string; pin: string } {
	const separator = value.lastIndexOf('.');
	if (separator <= 0 || separator === value.length - 1) {
		throw new CommandError('INVALID_PIN_ADDRESS', `${value} must look like U1.1`);
	}
	return { reference: value.slice(0, separator), pin: value.slice(separator + 1) };
}

async function findComponent(reference: string): Promise<ISCH_PrimitiveComponent> {
	const components = await eda.sch_PrimitiveComponent.getAll(undefined, false);
	const component = components.find(
		candidate => stateString(candidate, 'Designator') === reference,
	);
	if (!component) {
		throw new CommandError('INVALID_COMPONENT', `${reference} was not found`);
	}
	return component;
}

async function findPin(address: { reference: string; pin: string }): Promise<ISCH_PrimitivePin> {
	const component = await findComponent(address.reference);
	const pin = (await component.getAllPins() ?? []).find(
		candidate => stateString(candidate, 'PinNumber') === address.pin,
	);
	if (!pin) {
		throw new CommandError('INVALID_PIN', `${address.reference}.${address.pin} was not found`);
	}
	return pin;
}

function requireCoordinate(pin: unknown, property: 'X' | 'Y'): number {
	const coordinate = stateNumber(pin, property);
	if (coordinate === undefined) {
		throw new CommandError('PIN_COORDINATE_UNAVAILABLE', `Pin ${property} is unavailable`);
	}
	return coordinate;
}

function flattenPoints(points: Point[]): number[] {
	return points.flatMap(point => point);
}

async function validateWirePath(
	points: Point[],
	net: string,
	allowCrossings: boolean,
	ignorePrimitiveId?: string,
): Promise<void> {
	for (let index = 1; index < points.length; index += 1) {
		const [a, b] = [points[index - 1], points[index]];
		if (a[0] !== b[0] && a[1] !== b[1]) {
			throw new CommandError(
				'NON_ORTHOGONAL_PATH',
				`Segment ${index - 1} -> ${index} must be horizontal or vertical`,
			);
		}
	}
	if (allowCrossings) return;
	const proposed = pointsToSegments(points);
	const wires = await eda.sch_PrimitiveWire.getAll();
	for (const wire of wires) {
		if (wire.getState_PrimitiveId() === ignorePrimitiveId) continue;
		const existingNet = stateString(wire, 'Net')?.trim() ?? '';
		if (net && existingNet === net) continue;
		const existing = lineToSegments(state(wire, 'Line'));
		for (const candidate of proposed) {
			for (const occupied of existing) {
				if (segmentsIntersect(candidate, occupied)) {
					throw new CommandError(
						'WIRE_CROSSING',
						`Proposed ${net || '<unnamed>'} wire intersects ${existingNet || '<unnamed>'}`,
						{ proposed: candidate, existing: occupied, existing_net: existingNet },
					);
				}
			}
		}
	}
}

function pointsToSegments(points: Point[]): Segment[] {
	return points.slice(1).map((point, index) => [points[index], point]);
}

function lineToSegments(value: unknown): Segment[] {
	if (!Array.isArray(value)) return [];
	const paths = Array.isArray(value[0]) ? value : [value];
	const segments: Segment[] = [];
	for (const path of paths) {
		if (!Array.isArray(path)) continue;
		const points: Point[] = [];
		for (let index = 0; index + 1 < path.length; index += 2) {
			if (typeof path[index] === 'number' && typeof path[index + 1] === 'number') {
				points.push([path[index], path[index + 1]]);
			}
		}
		segments.push(...pointsToSegments(points));
	}
	return segments;
}

function segmentsIntersect([a, b]: Segment, [c, d]: Segment): boolean {
	const between = (value: number, edge1: number, edge2: number): boolean =>
		value >= Math.min(edge1, edge2) && value <= Math.max(edge1, edge2);
	if (a[1] === b[1] && c[0] === d[0]) {
		return between(c[0], a[0], b[0]) && between(a[1], c[1], d[1]);
	}
	if (a[0] === b[0] && c[1] === d[1]) {
		return between(a[0], c[0], d[0]) && between(c[1], a[1], b[1]);
	}
	if (a[1] === b[1] && c[1] === d[1] && a[1] === c[1]) {
		return Math.max(Math.min(a[0], b[0]), Math.min(c[0], d[0]))
			<= Math.min(Math.max(a[0], b[0]), Math.max(c[0], d[0]));
	}
	if (a[0] === b[0] && c[0] === d[0] && a[0] === c[0]) {
		return Math.max(Math.min(a[1], b[1]), Math.min(c[1], d[1]))
			<= Math.min(Math.max(a[1], b[1]), Math.max(c[1], d[1]));
	}
	return false;
}
