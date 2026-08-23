import { primitiveSnapshot, stateString, toPlainData } from '../utils/eda';
import {
	CommandError,
	optionalString,
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
	const [lines, arcs, polylines, vias, layers] = await Promise.all([
		eda.pcb_PrimitiveLine.getAll(),
		eda.pcb_PrimitiveArc.getAll(),
		eda.pcb_PrimitivePolyline.getAll(),
		eda.pcb_PrimitiveVia.getAll(),
		eda.pcb_Layer.getAllLayers(),
	]);
	return {
		components: components.map(component => primitiveSnapshot(component, COMPONENT_PROPERTIES)),
		pads: [...freePads, ...componentPads.flat()].map(pad => primitiveSnapshot(pad, PAD_PROPERTIES)),
		tracks: [...lines, ...arcs, ...polylines].map(track => primitiveSnapshot(track, TRACK_PROPERTIES)),
		vias: vias.map(via => primitiveSnapshot(via, VIA_PROPERTIES)),
		layers: toPlainData(layers),
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
