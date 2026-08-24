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
	getPcbPrimitivesBBox,
	modifyPcbComponent,
	modifyPcbTrack,
	modifyPcbVia,
	placePcbComponent,
	routePcbNet,
} from './pcb';
import { getProjectInfo } from './project';
import {
	callRawEdaApi,
	callRawPrimitive,
	describeRawEdaApi,
	describeRawEdaType,
	exportRawEdaFile,
	exportRawPrimitiveFile,
	listRawEdaApis,
	subscribeRawEdaEvent,
	unsubscribeRawEdaEvent,
} from './raw-api';
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
	getSchematicPrimitivesBBox,
	getSchematicNetlist,
	modifySchematicNetLabel,
	modifySchematicNetMarker,
	modifySchematicPin,
	modifySchematicComponent,
	modifySchematicWire,
	placeSchematicComponent,
	searchComponents,
} from './schematic';
import { CommandError } from '../utils/validation';

type Handler = (params: Record<string, unknown>) => Promise<unknown>;

const handlers: Record<string, Handler> = {
	'eda.call': callRawEdaApi,
	'eda.call_primitive': callRawPrimitive,
	'eda.describe_api': describeRawEdaApi,
	'eda.describe_type': describeRawEdaType,
	'eda.export_file': exportRawEdaFile,
	'eda.export_primitive_file': exportRawPrimitiveFile,
	'eda.list_apis': listRawEdaApis,
	'eda.subscribe': subscribeRawEdaEvent,
	'eda.unsubscribe': unsubscribeRawEdaEvent,
	'project.get_info': getProjectInfo,
	'schematic.get_info': getSchematicInfo,
	'schematic.get_primitives_bbox': getSchematicPrimitivesBBox,
	'schematic.get_netlist': getSchematicNetlist,
	'component.search': searchComponents,
	'schematic.place_component': placeSchematicComponent,
	'schematic.add_component': addSchematicComponent,
	'schematic.modify_component': modifySchematicComponent,
	'schematic.delete_components': deleteSchematicComponents,
	'schematic.delete_wires': deleteSchematicWires,
	'schematic.modify_wire': modifySchematicWire,
	'schematic.modify_pin': modifySchematicPin,
	'schematic.clear': clearSchematic,
	'schematic.create_net_flag': createSchematicNetFlag,
	'schematic.create_net_port': createSchematicNetPort,
	'schematic.modify_net_marker': modifySchematicNetMarker,
	'schematic.create_net_label': createSchematicNetLabel,
	'schematic.modify_net_label': modifySchematicNetLabel,
	'schematic.connect_net': connectSchematicNet,
	'schematic.create_wire': createSchematicWire,
	'schematic.connect': connectSchematicPins,
	'schematic.auto_layout': autoLayoutSchematic,
	'schematic.auto_route': autoRouteSchematic,
	'schematic.run_drc': runSchematicDrc,
	'pcb.get_info': getPcbInfo,
	'pcb.get_primitives_bbox': getPcbPrimitivesBBox,
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
