import { primitiveSnapshot, stateString, toPlainData } from '../utils/eda';
import {
	CommandError,
	optionalBoolean,
	optionalInteger,
	optionalNumber,
	optionalString,
	optionalStringArray,
	requiredPointArray,
	requiredNumber,
	requiredString,
} from '../utils/validation';

const COMPONENT_PROPERTIES = [
	'PrimitiveId', 'Designator', 'Name', 'Layer', 'X', 'Y', 'Rotation', 'PrimitiveLock',
] as const;
const PAD_PROPERTIES = [
	'PrimitiveId', 'ParentComponentPrimitiveId', 'PadNumber', 'Net', 'Layer', 'X', 'Y',
	'HoleDiameter', 'Diameter', 'Shape',
] as const;
const TRACK_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'Net', 'Layer', 'StartX', 'StartY', 'EndX', 'EndY',
	'LineWidth', 'Polygon', 'PrimitiveLock',
] as const;
const VIA_PROPERTIES = [
	'PrimitiveId', 'Net', 'X', 'Y', 'HoleDiameter', 'Diameter', 'ViaType', 'PrimitiveLock',
] as const;

export async function getPcbInfo(): Promise<Record<string, unknown>> {
	const components = await eda.pcb_PrimitiveComponent.getAll();
	const componentPads = await Promise.all(components.map(component => component.getAllPins()));
	const freePads = await eda.pcb_PrimitivePad.getAll();
	const [lines, arcs, polylines, vias, layers, nets] = await Promise.all([
		 eda.pcb_PrimitiveLine.getAll(),
		eda.pcb_PrimitiveArc.getAll(),
		eda.pcb_PrimitivePolyline.getAll(),
		 eda.pcb_PrimitiveVia.getAll(),
		 eda.pcb_Layer.getAllLayers(),
		 eda.pcb_Net.getAllNets(),
	]);
	return {
		components: components.map(component => primitiveSnapshot(component, COMPONENT_PROPERTIES)),
		pads: [...freePads, ...componentPads.flat()].map(pad => primitiveSnapshot(pad, PAD_PROPERTIES)),
		tracks: [...lines, ...arcs, ...polylines].map(track => primitiveSnapshot(track, TRACK_PROPERTIES)),
		vias: vias.map(via => primitiveSnapshot(via, VIA_PROPERTIES)),
		layers: toPlainData(layers),
		nets: toPlainData(nets),
	};
}

export async function placePcbComponent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const reference = requiredString(params, 'reference');
	const x = requiredNumber(params, 'x');
	const y = requiredNumber(params, 'y');
	const components = await eda.pcb_PrimitiveComponent.getAll();
	const component = components.find(
		candidate => stateString(candidate, 'Designator') === reference,
	);
	if (!component) {
		throw new CommandError('INVALID_COMPONENT', `${reference} not found`);
	}
	const updated = await eda.pcb_PrimitiveComponent.modify(
		component.getState_PrimitiveId(),
		{ x, y },
	);
	if (!updated) {
		throw new CommandError('COMPONENT_MOVE_FAILED', `${reference} could not be moved`);
	}
	return primitiveSnapshot(updated, COMPONENT_PROPERTIES);
}

export async function modifyPcbComponent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const reference = requiredString(params, 'reference');
	const components = await eda.pcb_PrimitiveComponent.getAll();
	const component = components.find(
		candidate => stateString(candidate, 'Designator') === reference,
	);
	if (!component) {
		throw new CommandError('INVALID_COMPONENT', `${reference} not found`);
	}
	const property: {
		layer?: EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM;
		x?: number;
		y?: number;
		rotation?: number;
		primitiveLock?: boolean;
		addIntoBom?: boolean;
		designator?: string;
		name?: string;
	} = {};
	const layer = optionalNumber(params, 'layer');
	const x = optionalNumber(params, 'x');
	const y = optionalNumber(params, 'y');
	const rotation = optionalNumber(params, 'rotation');
	if (layer !== undefined) property.layer = layer as EPCB_LayerId.TOP | EPCB_LayerId.BOTTOM;
	if (x !== undefined) property.x = x;
	if (y !== undefined) property.y = y;
	if (rotation !== undefined) property.rotation = rotation;
	if (params.locked !== undefined) property.primitiveLock = optionalBoolean(params, 'locked', false);
	if (params.add_into_bom !== undefined) {
		property.addIntoBom = optionalBoolean(params, 'add_into_bom', true);
	}
	if (params.new_reference !== undefined) {
		property.designator = requiredString(params, 'new_reference');
	}
	if (params.name !== undefined) property.name = requiredString(params, 'name');
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one component property is required');
	}
	const updated = await eda.pcb_PrimitiveComponent.modify(
		component.getState_PrimitiveId(),
		property,
	);
	if (!updated) {
		throw new CommandError('COMPONENT_MODIFY_FAILED', `${reference} could not be modified`);
	}
	return primitiveSnapshot(updated, COMPONENT_PROPERTIES);
}

export async function deletePcbComponents(
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
	const components = await eda.pcb_PrimitiveComponent.getAll();
	const resolvedIds = components
		.filter(component => references.includes(stateString(component, 'Designator') ?? ''))
		.map(component => component.getState_PrimitiveId());
	const ids = [...new Set([...primitiveIds, ...resolvedIds])];
	if (ids.length === 0) {
		throw new CommandError('INVALID_COMPONENT', 'No matching PCB components were found');
	}
	return {
		deleted: await eda.pcb_PrimitiveComponent.delete(ids),
		primitive_ids: ids,
	};
}

export async function routePcbNet(
	params: Record<string, unknown>,
): Promise<unknown> {
	const net = requiredString(params, 'net');
	const strategy = optionalString(params, 'strategy', 'completion').toLowerCase();
	const result = await eda.pcb_Document.autoRouting({
		RoutingNets: [net],
		optimization: strategy === 'fast'
			? EPCB_AutoRoutingOptimization.FASTER
			: EPCB_AutoRoutingOptimization.COMPLETION,
		cornerStyle: EPCB_AutoRoutingCornerStyle.DEGREE_45,
	});
	return toPlainData(result);
}

export async function autoRoutePcb(
	params: Record<string, unknown>,
): Promise<unknown> {
	const nets = optionalStringArray(params, 'nets');
	const ignoreNets = optionalStringArray(params, 'ignore_nets');
	const strategy = optionalString(params, 'strategy', 'completion').toLowerCase();
	let routingNets = nets;
	if (ignoreNets && ignoreNets.length > 0) {
		const source = routingNets ?? await eda.pcb_Net.getAllNetsName();
		routingNets = source.filter(net => !ignoreNets.includes(net));
	}
	return toPlainData(await eda.pcb_Document.autoRouting({
		RoutingNets: routingNets,
		optimization: strategy === 'fast'
			? EPCB_AutoRoutingOptimization.FASTER
			: EPCB_AutoRoutingOptimization.COMPLETION,
		cornerStyle: EPCB_AutoRoutingCornerStyle.DEGREE_45,
	}));
}

export async function autoLayoutPcb(): Promise<unknown> {
	return toPlainData(await eda.pcb_Document.autoLayout());
}

export async function clearPcbRouting(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const type = optionalString(params, 'type', 'all');
	if (!['all', 'net', 'connection'].includes(type)) {
		throw new CommandError('INVALID_PARAMS', 'type must be all, net, or connection');
	}
	return { cleared: await eda.pcb_Document.clearRouting(type as 'all' | 'net' | 'connection') };
}

export async function createPcbTrack(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const track = await eda.pcb_PrimitiveLine.create(
		optionalString(params, 'net', ''),
		requiredNumber(params, 'layer') as TPCB_LayersOfLine,
		requiredNumber(params, 'start_x'),
		requiredNumber(params, 'start_y'),
		requiredNumber(params, 'end_x'),
		requiredNumber(params, 'end_y'),
		optionalNumber(params, 'width', 10),
		optionalBoolean(params, 'locked', false),
	);
	if (!track) {
		throw new CommandError('TRACK_CREATE_FAILED', 'JLCEDA did not create the PCB track');
	}
	return primitiveSnapshot(track, TRACK_PROPERTIES);
}

export async function modifyPcbTrack(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveId = requiredString(params, 'primitive_id');
	const property: {
		net?: string;
		layer?: TPCB_LayersOfLine;
		startX?: number;
		startY?: number;
		endX?: number;
		endY?: number;
		lineWidth?: number;
		primitiveLock?: boolean;
	} = {};
	if (params.net !== undefined) property.net = optionalString(params, 'net', '');
	const layer = optionalNumber(params, 'layer');
	const startX = optionalNumber(params, 'start_x');
	const startY = optionalNumber(params, 'start_y');
	const endX = optionalNumber(params, 'end_x');
	const endY = optionalNumber(params, 'end_y');
	const width = optionalNumber(params, 'width');
	if (layer !== undefined) property.layer = layer as TPCB_LayersOfLine;
	if (startX !== undefined) property.startX = startX;
	if (startY !== undefined) property.startY = startY;
	if (endX !== undefined) property.endX = endX;
	if (endY !== undefined) property.endY = endY;
	if (width !== undefined) property.lineWidth = width;
	if (params.locked !== undefined) {
		property.primitiveLock = optionalBoolean(params, 'locked', false);
	}
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one track property is required');
	}
	const track = await eda.pcb_PrimitiveLine.modify(primitiveId, property);
	if (!track) throw new CommandError('TRACK_MODIFY_FAILED', primitiveId);
	return primitiveSnapshot(track, TRACK_PROPERTIES);
}

export async function createPcbBoardOutline(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const points = requiredPointArray(params, 'points', 2);
	const close = optionalBoolean(params, 'close', true);
	const path = [...points];
	if (close) {
		const first = path[0];
		const last = path[path.length - 1];
		if (first[0] !== last[0] || first[1] !== last[1]) path.push(first);
	}
	const width = optionalNumber(params, 'width', 10);
	const lines: Record<string, unknown>[] = [];
	for (let index = 1; index < path.length; index += 1) {
		const [startX, startY] = path[index - 1];
		const [endX, endY] = path[index];
		const line = await eda.pcb_PrimitiveLine.create(
			'',
			EPCB_LayerId.BOARD_OUTLINE,
			startX,
			startY,
			endX,
			endY,
			width,
			false,
		);
		if (!line) throw new CommandError('BOARD_OUTLINE_CREATE_FAILED', `segment ${index}`);
		lines.push(primitiveSnapshot(line, TRACK_PROPERTIES));
	}
	return { closed: close, lines };
}

export async function createPcbVia(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const via = await eda.pcb_PrimitiveVia.create(
		requiredString(params, 'net'),
		requiredNumber(params, 'x'),
		requiredNumber(params, 'y'),
		requiredNumber(params, 'hole_diameter'),
		requiredNumber(params, 'diameter'),
		optionalInteger(params, 'via_type', 0, 0, 2) as EPCB_PrimitiveViaType,
		undefined,
		undefined,
		optionalBoolean(params, 'locked', false),
	);
	if (!via) {
		throw new CommandError('VIA_CREATE_FAILED', 'JLCEDA did not create the PCB via');
	}
	return primitiveSnapshot(via, VIA_PROPERTIES);
}

export async function modifyPcbVia(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveId = requiredString(params, 'primitive_id');
	const property: {
		net?: string;
		x?: number;
		y?: number;
		holeDiameter?: number;
		diameter?: number;
		viaType?: EPCB_PrimitiveViaType;
		primitiveLock?: boolean;
	} = {};
	if (params.net !== undefined) property.net = optionalString(params, 'net', '');
	const x = optionalNumber(params, 'x');
	const y = optionalNumber(params, 'y');
	const holeDiameter = optionalNumber(params, 'hole_diameter');
	const diameter = optionalNumber(params, 'diameter');
	if (x !== undefined) property.x = x;
	if (y !== undefined) property.y = y;
	if (holeDiameter !== undefined) property.holeDiameter = holeDiameter;
	if (diameter !== undefined) property.diameter = diameter;
	if (params.via_type !== undefined) {
		property.viaType = optionalInteger(params, 'via_type', 0, 0, 2) as EPCB_PrimitiveViaType;
	}
	if (params.locked !== undefined) {
		property.primitiveLock = optionalBoolean(params, 'locked', false);
	}
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one via property is required');
	}
	const via = await eda.pcb_PrimitiveVia.modify(primitiveId, property);
	if (!via) throw new CommandError('VIA_MODIFY_FAILED', primitiveId);
	return primitiveSnapshot(via, VIA_PROPERTIES);
}

export async function deletePcbRoutingPrimitives(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const lineIds = optionalStringArray(params, 'line_ids') ?? [];
	const arcIds = optionalStringArray(params, 'arc_ids') ?? [];
	const polylineIds = optionalStringArray(params, 'polyline_ids') ?? [];
	const viaIds = optionalStringArray(params, 'via_ids') ?? [];
	if (lineIds.length + arcIds.length + polylineIds.length + viaIds.length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one routing primitive ID is required');
	}
	return {
		lines_deleted: lineIds.length === 0 || await eda.pcb_PrimitiveLine.delete(lineIds),
		arcs_deleted: arcIds.length === 0 || await eda.pcb_PrimitiveArc.delete(arcIds),
		polylines_deleted: polylineIds.length === 0
			|| await eda.pcb_PrimitivePolyline.delete(polylineIds),
		vias_deleted: viaIds.length === 0 || await eda.pcb_PrimitiveVia.delete(viaIds),
		line_ids: lineIds,
		arc_ids: arcIds,
		polyline_ids: polylineIds,
		via_ids: viaIds,
	};
}
