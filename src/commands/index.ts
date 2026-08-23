import { captureCanvas, captureRegion } from './capture';
import { runPcbDrc, runSchematicDrc } from './drc';
import {
	autoLayoutPcb,
	autoRoutePcb,
	clearPcbRouting,
	createPcbBoardOutline,
	createPcbTrack,
	createPcbVia,
	deletePcbComponents,
	deletePcbRoutingPrimitives,
	getPcbInfo,
	modifyPcbComponent,
	modifyPcbTrack,
	modifyPcbVia,
	placePcbComponent,
	routePcbNet,
} from './pcb';
import { getProjectInfo } from './project';
import {
	addSchematicComponent,
	autoLayoutSchematic,
	autoRouteSchematic,
	clearSchematic,
	connectSchematicNet,
	connectSchematicPins,
	createSchematicNetFlag,
	createSchematicNetLabel,
	createSchematicNetPort,
	createSchematicWire,
	deleteSchematicComponents,
	deleteSchematicWires,
	getSchematicInfo,
	getSchematicNetlist,
	modifySchematicComponent,
	modifySchematicWire,
	placeSchematicComponent,
	searchComponents,
	setSchematicPinNoConnect,
} from './schematic';
import { CommandError } from '../utils/validation';

type Handler = (params: Record<string, unknown>) => Promise<unknown>;

const handlers: Record<string, Handler> = {
	'project.get_info': getProjectInfo,
	'schematic.get_info': getSchematicInfo,
	'schematic.get_netlist': getSchematicNetlist,
	'component.search': searchComponents,
	'schematic.place_component': placeSchematicComponent,
	'schematic.add_component': addSchematicComponent,
	'schematic.modify_component': modifySchematicComponent,
	'schematic.delete_components': deleteSchematicComponents,
	'schematic.delete_wires': deleteSchematicWires,
	'schematic.modify_wire': modifySchematicWire,
	'schematic.set_pin_no_connect': setSchematicPinNoConnect,
	'schematic.clear': clearSchematic,
	'schematic.create_net_flag': createSchematicNetFlag,
	'schematic.create_net_port': createSchematicNetPort,
	'schematic.create_net_label': createSchematicNetLabel,
	'schematic.connect_net': connectSchematicNet,
	'schematic.create_wire': createSchematicWire,
	'schematic.connect': connectSchematicPins,
	'schematic.auto_layout': autoLayoutSchematic,
	'schematic.auto_route': autoRouteSchematic,
	'schematic.run_drc': runSchematicDrc,
	'pcb.get_info': getPcbInfo,
	'pcb.place_component': placePcbComponent,
	'pcb.modify_component': modifyPcbComponent,
	'pcb.delete_components': deletePcbComponents,
	'pcb.create_track': createPcbTrack,
	'pcb.modify_track': modifyPcbTrack,
	'pcb.create_board_outline': createPcbBoardOutline,
	'pcb.create_via': createPcbVia,
	'pcb.modify_via': modifyPcbVia,
	'pcb.delete_routing_primitives': deletePcbRoutingPrimitives,
	'pcb.clear_routing': clearPcbRouting,
	'pcb.route_net': routePcbNet,
	'pcb.auto_route': autoRoutePcb,
	'pcb.auto_layout': autoLayoutPcb,
	'pcb.run_drc': runPcbDrc,
	'capture.schematic': captureCanvas,
	'capture.pcb': captureCanvas,
	'capture.region': captureRegion,
};

export async function dispatchCommand(
	method: string,
	params: Record<string, unknown>,
): Promise<unknown> {
	const handler = handlers[method];
	if (!handler) {
		throw new CommandError('METHOD_NOT_FOUND', `Unsupported method: ${method}`);
	}
	return handler(params);
}
