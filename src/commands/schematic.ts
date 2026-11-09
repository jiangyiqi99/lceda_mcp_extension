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
	'Rotation', 'Mirror', 'Net', 'AddIntoBom', 'AddIntoPcb', 'Component', 'SubPartName',
	'Symbol', 'Footprint', 'UniqueId', 'Manufacturer', 'ManufacturerId', 'Supplier',
	'SupplierId', 'OtherProperty',
] as const;
const PIN_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'PinNumber', 'PinName', 'X', 'Y', 'Rotation',
	'PinLength', 'PinColor', 'PinShape', 'NoConnected', 'OtherProperty',
] as const;
const WIRE_PROPERTIES = [
	'PrimitiveId', 'Line', 'Net', 'Color', 'LineWidth', 'LineType',
] as const;
const ATTRIBUTE_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'X', 'Y', 'Rotation', 'Color', 'FontName',
	'FontSize', 'Bold', 'Italic', 'UnderLine', 'AlignMode', 'FillColor', 'Key', 'Value',
	'KeyVisible', 'ValueVisible', 'ParentPrimitiveId',
] as const;
const ARC_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'StartX', 'StartY', 'ReferenceX', 'ReferenceY',
	'EndX', 'EndY', 'Color', 'FillColor', 'LineWidth', 'LineType',
] as const;
const BUS_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'BusName', 'Line', 'Color', 'LineWidth', 'LineType',
] as const;
const CIRCLE_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'CenterX', 'CenterY', 'Radius', 'Color', 'FillColor',
	'LineWidth', 'LineType', 'FillStyle',
] as const;
const POLYGON_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'Line', 'Color', 'FillColor', 'LineWidth', 'LineType',
] as const;
const RECTANGLE_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'TopLeftX', 'TopLeftY', 'Width', 'Height',
	'CornerRadius', 'Rotation', 'Color', 'FillColor', 'LineWidth', 'LineType', 'FillStyle',
] as const;
const TEXT_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'X', 'Y', 'Content', 'Rotation', 'TextColor',
	'FontName', 'FontSize', 'Bold', 'Italic', 'UnderLine', 'AlignMode',
] as const;
const OBJECT_PROPERTIES = [
	'PrimitiveId', 'PrimitiveType', 'Content', 'StartX', 'StartY', 'Width', 'Height',
	'Rotation', 'Mirror', 'FileName',
] as const;

type Point = [number, number];
type Segment = [Point, Point];

export async function getSchematicInfo(): Promise<Record<string, unknown>> {
	const components = await eda.sch_PrimitiveComponent.getAll(undefined, false);
	const componentData = await Promise.all(components.map(async (component) => {
		const [pins, bbox] = await Promise.all([
			component.getAllPins(),
			eda.sch_Primitive.getPrimitivesBBox([component]),
		]);
		return {
			...primitiveSnapshot(component, COMPONENT_PROPERTIES),
			bbox: toPlainData(bbox),
			pins: (pins ?? []).map(pin => pinSnapshot(pin, bbox)),
		};
	}));
	const [
		wires, attributes, arcs, buses, circles, polygons, rectangles, texts, objects,
		nets, symbolPins,
	] =
		await Promise.all([
			eda.sch_PrimitiveWire.getAll(),
			eda.sch_PrimitiveAttribute.getAll(),
			eda.sch_PrimitiveArc.getAll(),
			eda.sch_PrimitiveBus.getAll(),
			eda.sch_PrimitiveCircle.getAll(),
			eda.sch_PrimitivePolygon.getAll(),
			eda.sch_PrimitiveRectangle.getAll(),
			eda.sch_PrimitiveText.getAll(),
			eda.sch_PrimitiveObject.getAll(),
			eda.sch_Net.getCurrentProjectAllNets(),
			eda.sch_PrimitivePin.getAll(),
		]);
	const [attributeData, textData] = await Promise.all([
		Promise.all(attributes.map(attribute => primitiveSnapshotWithBBox(
			attribute,
			ATTRIBUTE_PROPERTIES,
		))),
		Promise.all(texts.map(text => primitiveSnapshotWithBBox(text, TEXT_PROPERTIES))),
	]);
	const componentPins = componentData.flatMap(component => component.pins);
	const symbolPinData = symbolPins.map(pin => pinSnapshot(pin));
	return {
		components: componentData,
		pins: [...componentPins, ...symbolPinData],
		symbol_pins: symbolPinData,
		attributes: attributeData,
		net_labels: attributeData.filter(attribute => !attribute.parentPrimitiveId),
		nets: toPlainData(nets),
		wires: wires.map(wire => primitiveSnapshot(wire, WIRE_PROPERTIES)),
		graphics: {
			arcs: arcs.map(value => primitiveSnapshot(value, ARC_PROPERTIES)),
			buses: buses.map(value => primitiveSnapshot(value, BUS_PROPERTIES)),
			circles: circles.map(value => primitiveSnapshot(value, CIRCLE_PROPERTIES)),
			polygons: polygons.map(value => primitiveSnapshot(value, POLYGON_PROPERTIES)),
			rectangles: rectangles.map(value => primitiveSnapshot(value, RECTANGLE_PROPERTIES)),
			texts: textData,
			objects: objects.map(value => primitiveSnapshot(value, OBJECT_PROPERTIES)),
		},
	};
}

async function primitiveSnapshotWithBBox(
	primitive: ISCH_Primitive,
	properties: readonly string[],
): Promise<Record<string, unknown>> {
	return {
		...primitiveSnapshot(primitive, properties),
		bbox: toPlainData(await eda.sch_Primitive.getPrimitivesBBox([primitive])),
	};
}

export async function getSchematicPrimitivesBBox(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveIds = requiredStringArray(params, 'primitive_ids');
	return {
		primitive_ids: primitiveIds,
		bbox: toPlainData(await eda.sch_Primitive.getPrimitivesBBox(primitiveIds)),
	};
}

/**
 * Checks every unordered pair of schematic components and textual primitives.
 * This deliberately differs from placement feedback, which only checks one
 * newly changed component against the rest of the sheet.
 */
export async function detectSchematicOverlaps(): Promise<Record<string, unknown>> {
	const [components, attributes, texts] = await Promise.all([
		eda.sch_PrimitiveComponent.getAll(undefined, false),
		eda.sch_PrimitiveAttribute.getAll(),
		eda.sch_PrimitiveText.getAll(),
	]);
	const candidates: SchematicOverlapCandidate[] = [
		...components.map(primitive => ({ kind: 'component' as const, primitive })),
		...attributes.map(primitive => ({ kind: 'attribute' as const, primitive })),
		...texts.map(primitive => ({ kind: 'text' as const, primitive })),
	];
	const candidateBoxes = await Promise.all(candidates.map(async candidate => ({
		...candidate,
		bbox: await eda.sch_Primitive.getPrimitivesBBox([candidate.primitive]),
	})));
	const primitives: SchematicOverlapPrimitive[] = candidateBoxes.flatMap(candidate => (
		candidate.bbox ? [{ ...candidate, bbox: candidate.bbox }] : []
	));
	const overlaps: SchematicOverlapPair[] = [];
	for (let first = 0; first < primitives.length; first += 1) {
		for (let second = first + 1; second < primitives.length; second += 1) {
			const left = primitives[first];
			const right = primitives[second];
			if (!bboxesOverlap(left.bbox, right.bbox)) continue;
			overlaps.push({
				first: overlapItemSnapshot(left),
				second: overlapItemSnapshot(right),
			});
		}
	}
	return {
		has_overlap: overlaps.length > 0,
		overlap_count: overlaps.length,
		checked: {
			components: components.length,
			attributes: attributes.length,
			texts: texts.length,
			with_bbox: primitives.length,
			without_bbox: candidates.length - primitives.length,
		},
		overlaps,
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
		optionalString(definition, 'sub_part_name', '') || undefined,
		optionalNumber(definition, 'rotation', 0),
		optionalBoolean(definition, 'mirror', false),
		optionalBoolean(definition, 'add_into_bom', true),
		optionalBoolean(definition, 'add_into_pcb', true),
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
		optionalString(params, 'sub_part_name', '') || undefined,
		optionalNumber(params, 'rotation', 0),
		optionalBoolean(params, 'mirror', false),
		optionalBoolean(params, 'add_into_bom', true),
		optionalBoolean(params, 'add_into_pcb', true),
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
		uniqueId?: string;
		manufacturer?: string;
		manufacturerId?: string;
		supplier?: string;
		supplierId?: string;
		otherProperty?: Record<string, string | number | boolean>;
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
	for (const [source, target] of [
		['unique_id', 'uniqueId'], ['manufacturer', 'manufacturer'],
		['manufacturer_id', 'manufacturerId'], ['supplier', 'supplier'],
		['supplier_id', 'supplierId'],
	] as const) {
		if (params[source] !== undefined) property[target] = requiredString(params, source);
	}
	if (params.other_property !== undefined) {
		property.otherProperty = asRecord(params.other_property, 'other_property') as Record<
			string,
			string | number | boolean
		>;
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
	return componentPlacementResult(updated);
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

export async function modifySchematicPin(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveId = requiredString(params, 'primitive_id');
	const pin = await eda.sch_PrimitivePin.get(primitiveId);
	if (!pin) {
		throw new CommandError(
			'INVALID_SYMBOL_PIN',
			`${primitiveId} is not a standalone pin in the active symbol editor`,
		);
	}
	const property: {
		x?: number;
		y?: number;
		pinNumber?: string;
		pinName?: string;
		rotation?: number;
		pinLength?: number;
		pinColor?: string | null;
		pinShape?: ESCH_PrimitivePinShape;
		pinType?: ESCH_PrimitivePinType;
		noConnected?: boolean;
		otherProperty?: Record<string, string | number | boolean>;
	} = {};
	for (const [source, target] of [
		['x', 'x'], ['y', 'y'], ['rotation', 'rotation'], ['pin_length', 'pinLength'],
	] as const) {
		const value = optionalNumber(params, source);
		if (value !== undefined) property[target] = value;
	}
	if (params.pin_number !== undefined) property.pinNumber = requiredString(params, 'pin_number');
	if (params.pin_name !== undefined) property.pinName = requiredString(params, 'pin_name');
	if (params.pin_color !== undefined) {
		property.pinColor = params.pin_color === null ? null : requiredString(params, 'pin_color');
	}
	if (params.pin_shape !== undefined) {
		property.pinShape = enumString(
			params,
			'pin_shape',
			['None', 'Inverted', 'Clock', 'Inverted Clock'] as const,
		) as ESCH_PrimitivePinShape;
	}
	if (params.pin_type !== undefined) {
		property.pinType = enumString(
			params,
			'pin_type',
			[
				'IN', 'OUT', 'BI', 'Passive', 'Open Collector', 'Open Emitter',
				'Power', 'Ground', 'HIZ', 'Terminator', 'Undefined',
			] as const,
		) as ESCH_PrimitivePinType;
	}
	if (params.no_connected !== undefined) {
		property.noConnected = optionalBoolean(params, 'no_connected', false);
	}
	if (params.other_property !== undefined) {
		property.otherProperty = asRecord(params.other_property, 'other_property') as Record<
			string,
			string | number | boolean
		>;
	}
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one pin property is required');
	}
	const updated = await eda.sch_PrimitivePin.modify(pin, property);
	if (!updated) throw new CommandError('PIN_MODIFY_FAILED', primitiveId);
	return pinSnapshot(updated);
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

export async function modifySchematicNetMarker(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveId = requiredString(params, 'primitive_id');
	const marker = await eda.sch_PrimitiveComponent.get(primitiveId);
	if (!marker) throw new CommandError('INVALID_NET_MARKER', `${primitiveId} was not found`);
	const componentType = marker.getState_ComponentType();
	if (!['netport', 'netflag', 'offPageConnector', 'diffPairsFlag'].includes(componentType)) {
		throw new CommandError('INVALID_NET_MARKER', `${primitiveId} is ${componentType}`);
	}
	const asyncMarker = marker.toAsync();
	let changes = 0;
	const x = optionalNumber(params, 'x');
	const y = optionalNumber(params, 'y');
	const side = params.side === undefined
		? undefined
		: enumString(params, 'side', ['left', 'right', 'top', 'bottom'] as const);
	const rotation = optionalNumber(params, 'rotation');
	if (x !== undefined) { asyncMarker.setState_X(x); changes += 1; }
	if (y !== undefined) { asyncMarker.setState_Y(y); changes += 1; }
	if (side !== undefined) {
		asyncMarker.setState_Rotation({ left: 0, right: 180, top: 90, bottom: 270 }[side]);
		changes += 1;
	}
	if (rotation !== undefined) { asyncMarker.setState_Rotation(rotation); changes += 1; }
	if (params.mirror !== undefined) {
		asyncMarker.setState_Mirror(optionalBoolean(params, 'mirror', false));
		changes += 1;
	}
	if (params.net !== undefined) {
		asyncMarker.setState_Net(requiredString(params, 'net'));
		changes += 1;
	}
	if (changes === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one net marker property is required');
	}
	const updated = await asyncMarker.done();
	return primitiveSnapshot(updated, COMPONENT_PROPERTIES);
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
	const property = netLabelProperty(params, false);
	const updated = Object.keys(property).length === 0
		? label
		: await eda.sch_PrimitiveAttribute.modify(label, property);
	if (!updated) {
		throw new CommandError('NET_LABEL_MODIFY_FAILED', label.getState_PrimitiveId());
	}
	return primitiveSnapshot(updated, ATTRIBUTE_PROPERTIES);
}

export async function modifySchematicNetLabel(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const primitiveId = requiredString(params, 'primitive_id');
	const label = await eda.sch_PrimitiveAttribute.get(primitiveId);
	if (!label) throw new CommandError('INVALID_NET_LABEL', `${primitiveId} was not found`);
	const property = netLabelProperty(params, true);
	if (Object.keys(property).length === 0) {
		throw new CommandError('INVALID_PARAMS', 'At least one net label property is required');
	}
	const updated = await eda.sch_PrimitiveAttribute.modify(label, property);
	if (!updated) throw new CommandError('NET_LABEL_MODIFY_FAILED', primitiveId);
	return primitiveSnapshot(updated, ATTRIBUTE_PROPERTIES);
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
	const requestedSide = enumString(
		params,
		'side',
		['auto', 'left', 'right', 'top', 'bottom'] as const,
		'auto',
	);
	const portDirection = enumString(params, 'direction', ['IN', 'OUT', 'BI'] as const, 'BI');
	const created: Record<string, unknown>[] = [];
	for (const address of pins) {
		const parsed = parsePinAddress(address);
		const component = await findComponent(parsed.reference);
		const pin = await findPin(parsed);
		const x = requireCoordinate(pin, 'X');
		const y = requireCoordinate(pin, 'Y');
		const bbox = await eda.sch_Primitive.getPrimitivesBBox([component]);
		const side = requestedSide === 'auto' && bbox
			? classifyPointSide(x, y, bbox)
			: requestedSide === 'auto' ? 'left' : requestedSide;
		const rotation = { left: 0, right: 180, top: 90, bottom: 270 }[side];
		if (style === 'label') {
			const label = await eda.sch_PrimitiveAttribute.createNetLabel(x, y, net);
			if (!label) throw new CommandError('NET_LABEL_CREATE_FAILED', address);
			const updated = await eda.sch_PrimitiveAttribute.modify(
				label,
				netLabelProperty({ side }, false),
			);
			created.push(primitiveSnapshot(updated ?? label, ATTRIBUTE_PROPERTIES));
		}
		else if (style === 'port') {
			const port = await eda.sch_PrimitiveComponent.createNetPort(
				portDirection,
				net,
				x,
				y,
				rotation,
			);
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
			const flag = await eda.sch_PrimitiveComponent.createNetFlag(kind, net, x, y, rotation);
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
	subPartName?: string,
	rotation = 0,
	mirror = false,
	addIntoBom = true,
	addIntoPcb = true,
): Promise<{
	library_uuid: string;
	device_uuid: string;
	component: ComponentPlacementResult;
	bbox: BBox | null;
	overlaps: ComponentOverlap[];
	text_overlaps: TextOverlap[];
	warnings: ComponentOverlapWarning[];
}> {
	const component = await eda.sch_PrimitiveComponent.create(
		{ libraryUuid, uuid: deviceUuid },
		x,
		y,
		subPartName,
		rotation,
		mirror,
		addIntoBom,
		addIntoPcb,
	);
	if (!component) {
		throw new CommandError('COMPONENT_CREATE_FAILED', `Could not create ${deviceUuid}`);
	}
	const updated = await eda.sch_PrimitiveComponent.modify(
		component.getState_PrimitiveId(),
		{ designator: reference },
	);
	const placement = await componentPlacementResult(updated ?? component);
	return {
		library_uuid: libraryUuid,
		device_uuid: deviceUuid,
		component: placement,
		// Keep feedback top-level for schematic.place_component while retaining it
		// on component for the legacy schematic.add_component response.
		bbox: placement.bbox,
		overlaps: placement.overlaps,
		text_overlaps: placement.text_overlaps,
		warnings: placement.warnings,
	};
}

type BBox = { minX: number; minY: number; maxX: number; maxY: number };

type ComponentOverlap = {
	primitive_id: string;
	reference?: string;
	bbox: BBox;
};

type TextOverlap = {
	primitive_id: string;
	kind: 'attribute' | 'text';
	parent_primitive_id?: string;
	key: string | null;
	content: string | null;
	bbox: BBox;
};

type SchematicOverlapKind = 'component' | 'attribute' | 'text';

type SchematicOverlapCandidate = {
	kind: SchematicOverlapKind;
	primitive: ISCH_Primitive;
};

type SchematicOverlapPrimitive = SchematicOverlapCandidate & { bbox: BBox };

type SchematicOverlapItem = {
	kind: SchematicOverlapKind;
	primitive_id: string;
	reference?: string;
	parent_primitive_id?: string;
	key?: string;
	content?: string;
	bbox: BBox;
};

type SchematicOverlapPair = {
	first: SchematicOverlapItem;
	second: SchematicOverlapItem;
};

type ComponentOverlapWarning = {
	code: 'COMPONENT_OVERLAP' | 'TEXT_OVERLAP';
	message: string;
	overlaps: ComponentOverlap[] | TextOverlap[];
};

type ComponentPlacementResult = Record<string, unknown> & {
	bbox: BBox | null;
	overlaps: ComponentOverlap[];
	text_overlaps: TextOverlap[];
	warnings: ComponentOverlapWarning[];
};

function overlapItemSnapshot(
	{ kind, primitive, bbox }: SchematicOverlapPrimitive,
): SchematicOverlapItem {
	const item: SchematicOverlapItem = {
		kind,
		primitive_id: primitive.getState_PrimitiveId(),
		bbox,
	};
	if (kind === 'component') {
		const reference = stateString(primitive, 'Designator');
		if (reference) item.reference = reference;
	}
	else if (kind === 'attribute') {
		const parentPrimitiveId = stateString(primitive, 'ParentPrimitiveId');
		const key = stateString(primitive, 'Key');
		const content = stateString(primitive, 'Value');
		if (parentPrimitiveId) item.parent_primitive_id = parentPrimitiveId;
		if (key) item.key = key;
		if (content) item.content = content;
	}
	else {
		const content = stateString(primitive, 'Content');
		if (content) item.content = content;
	}
	return item;
}

/**
 * Returns placement geometry after a successful mutation.  Collision reporting is
 * deliberately advisory: callers have already completed the requested operation.
 */
async function componentPlacementResult(
	component: ISCH_PrimitiveComponent,
): Promise<ComponentPlacementResult> {
	const primitiveId = component.getState_PrimitiveId();
	const [bbox, components, attributes, texts] = await Promise.all([
		eda.sch_Primitive.getPrimitivesBBox([component]),
		eda.sch_PrimitiveComponent.getAll(undefined, false),
		eda.sch_PrimitiveAttribute.getAll(),
		eda.sch_PrimitiveText.getAll(),
	]);
	const candidates = components.filter(
		candidate => candidate.getState_PrimitiveId() !== primitiveId,
	);
	const candidateBoxes = await Promise.all(candidates.map(async candidate => ({
		candidate,
		bbox: await eda.sch_Primitive.getPrimitivesBBox([candidate]),
	})));
	const overlaps: ComponentOverlap[] = bbox
		? candidateBoxes.flatMap(({ candidate, bbox: candidateBBox }) => {
			if (!candidateBBox || !bboxesOverlap(bbox, candidateBBox)) return [];
			const reference = stateString(candidate, 'Designator');
			return [{
				primitive_id: candidate.getState_PrimitiveId(),
				...(reference ? { reference } : {}),
				bbox: candidateBBox,
			}];
		})
		: [];
	const textCandidates = [
		...attributes.map(attribute => ({ kind: 'attribute' as const, primitive: attribute })),
		...texts.map(text => ({ kind: 'text' as const, primitive: text })),
	];
	const textBoxes = await Promise.all(textCandidates.map(async candidate => ({
		...candidate,
		bbox: await eda.sch_Primitive.getPrimitivesBBox([candidate.primitive]),
	})));
	const textOverlaps: TextOverlap[] = bbox
		? textBoxes.flatMap(({ kind, primitive, bbox: textBBox }) => {
			if (!textBBox || !bboxesOverlap(bbox, textBBox)) return [];
			const parentPrimitiveId = kind === 'attribute'
				? stateString(primitive, 'ParentPrimitiveId')
				: undefined;
			return [{
				primitive_id: primitive.getState_PrimitiveId(),
				kind,
				...(parentPrimitiveId ? { parent_primitive_id: parentPrimitiveId } : {}),
				key: kind === 'attribute' ? stateString(primitive, 'Key') ?? null : null,
				content: kind === 'attribute'
					? stateString(primitive, 'Value') ?? null
					: stateString(primitive, 'Content') ?? null,
				bbox: textBBox,
			}];
		})
		: [];
	const warnings: ComponentOverlapWarning[] = [
		...(overlaps.length === 0 ? [] : [{
			code: 'COMPONENT_OVERLAP' as const,
			message: `Component overlaps ${overlaps.length} existing schematic component(s)`,
			overlaps,
		}]),
		...(textOverlaps.length === 0 ? [] : [{
			code: 'TEXT_OVERLAP' as const,
			message: `Component overlaps ${textOverlaps.length} schematic text primitive(s)`,
			overlaps: textOverlaps,
		}]),
	];
	return {
		...primitiveSnapshot(component, COMPONENT_PROPERTIES),
		// This is the editor's primitive BBox, not an approximation derived from pins.
		bbox: bbox ?? null,
		overlaps,
		text_overlaps: textOverlaps,
		warnings,
	};
}

function bboxesOverlap(first: BBox, second: BBox): boolean {
	return first.minX < second.maxX
		&& first.maxX > second.minX
		&& first.minY < second.maxY
		&& first.maxY > second.minY;
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
	const [fromNet, toNet] = await Promise.all([
		findWireNetAtPoint(x1, y1),
		findWireNetAtPoint(x2, y2),
	]);
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

export async function autoLayoutSchematic(params: Record<string, unknown>): Promise<unknown> {
	return toPlainData(await eda.sch_Document.autoLayout(schematicAutomationProps(params)));
}

export async function autoRouteSchematic(params: Record<string, unknown>): Promise<unknown> {
	return toPlainData(await eda.sch_Document.autoRouting(schematicAutomationProps(params)));
}

function schematicAutomationProps(params: Record<string, unknown>): {
	uuids?: string[];
	netlist?: { component: Record<string, { pinInfoMap: Record<string, {
		name: string;
		number: string;
		net: string;
		props: { 'Pin Number': string };
	}> }> };
	designatorDeviceTypeMap?: Record<string, 'resistor' | 'capacitor' | 'inductive' |
		'diode' | 'triode' | 'oscillator' | 'chip' | 'otherDevice'>;
} | undefined {
	const props: Record<string, unknown> = {};
	if (params.primitive_ids !== undefined) {
		props.uuids = requiredStringArray(params, 'primitive_ids', { allowEmpty: true });
	}
	if (params.netlist !== undefined) props.netlist = asRecord(params.netlist, 'netlist');
	if (params.device_types !== undefined) {
		props.designatorDeviceTypeMap = asRecord(params.device_types, 'device_types');
	}
	return Object.keys(props).length === 0 ? undefined : props as ReturnType<typeof schematicAutomationProps>;
}

function pinSnapshot(pin: ISCH_PrimitivePin, bbox?: BBox): Record<string, unknown> {
	const snapshot = primitiveSnapshot(pin, PIN_PROPERTIES);
	const pinTypeGetter = Reflect.get(pin, 'getState_pinType');
	if (typeof pinTypeGetter === 'function') {
		snapshot.pinType = Reflect.apply(pinTypeGetter, pin, []);
	}
	if (bbox) snapshot.side = classifyPointSide(pin.getState_X(), pin.getState_Y(), bbox);
	return snapshot;
}

function classifyPointSide(x: number, y: number, bbox: BBox): 'left' | 'right' | 'top' | 'bottom' {
	const distances = [
		['left', Math.abs(x - bbox.minX)],
		['right', Math.abs(x - bbox.maxX)],
		['top', Math.abs(y - bbox.minY)],
		['bottom', Math.abs(y - bbox.maxY)],
	] as const;
	return [...distances].sort((a, b) => a[1] - b[1])[0][0];
}

function netLabelProperty(
	params: Record<string, unknown>,
	includePosition: boolean,
): {
	x?: number | null;
	y?: number | null;
	rotation?: number | null;
	alignMode?: ESCH_PrimitiveTextAlignMode | null;
	color?: string | null;
	fontName?: string | null;
	fontSize?: number | null;
	bold?: boolean | null;
	italic?: boolean | null;
	underLine?: boolean | null;
	fillColor?: string | null;
	value?: string;
	keyVisible?: boolean | null;
	valueVisible?: boolean | null;
} {
	const property: ReturnType<typeof netLabelProperty> = {};
	if (includePosition) {
		const x = optionalNumber(params, 'x');
		const y = optionalNumber(params, 'y');
		if (x !== undefined) property.x = x;
		if (y !== undefined) property.y = y;
	}
	const side = params.side === undefined
		? undefined
		: enumString(params, 'side', ['left', 'right', 'top', 'bottom'] as const);
	if (side !== undefined) {
		const placement = {
			left: { rotation: 0, alignMode: 8 },
			right: { rotation: 0, alignMode: 2 },
			top: { rotation: 90, alignMode: 2 },
			bottom: { rotation: 270, alignMode: 2 },
		}[side];
		property.rotation = placement.rotation;
		property.alignMode = placement.alignMode as ESCH_PrimitiveTextAlignMode;
	}
	const rotation = optionalNumber(params, 'rotation');
	if (rotation !== undefined) property.rotation = rotation;
	if (params.align_mode !== undefined) {
		property.alignMode = optionalInteger(params, 'align_mode', 2, 1, 9) as
			ESCH_PrimitiveTextAlignMode;
	}
	const fontSize = optionalNumber(params, 'font_size');
	if (fontSize !== undefined) property.fontSize = fontSize;
	for (const [source, target] of [
		['color', 'color'], ['font_name', 'fontName'], ['fill_color', 'fillColor'],
	] as const) {
		if (params[source] !== undefined) {
			property[target] = params[source] === null ? null : requiredString(params, source);
		}
	}
	for (const [source, target] of [
		['bold', 'bold'], ['italic', 'italic'], ['under_line', 'underLine'],
		['key_visible', 'keyVisible'], ['value_visible', 'valueVisible'],
	] as const) {
		if (params[source] !== undefined) {
			property[target] = optionalBoolean(params, source, false);
		}
	}
	if (params.net !== undefined) property.value = requiredString(params, 'net');
	return property;
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

async function findWireNetAtPoint(x: number, y: number): Promise<string | undefined> {
	const nets = new Set<string>();
	for (const wire of await eda.sch_PrimitiveWire.getAll()) {
		const net = stateString(wire, 'Net')?.trim();
		if (!net) continue;
		if (lineToSegments(state(wire, 'Line')).some(segment => pointOnSegment([x, y], segment))) {
			nets.add(net);
		}
	}
	if (nets.size > 1) {
		throw new CommandError(
			'NET_CONFLICT',
			`Pin at (${x}, ${y}) touches multiple nets: ${[...nets].join(', ')}`,
		);
	}
	return nets.values().next().value as string | undefined;
}

function pointOnSegment([x, y]: Point, [a, b]: Segment): boolean {
	if (a[0] === b[0]) {
		return x === a[0] && y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]);
	}
	if (a[1] === b[1]) {
		return y === a[1] && x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]);
	}
	return false;
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
