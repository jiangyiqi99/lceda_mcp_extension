import { captureCanvas, captureRegion } from './capture';
import { runPcbDrc } from './drc';
import { getPcbInfo, placePcbComponent, routePcbNet } from './pcb';
import {
	addSchematicComponent,
	connectSchematicPins,
	getSchematicInfo,
} from './schematic';
import { CommandError } from '../utils/validation';

type Handler = (params: Record<string, unknown>) => Promise<unknown>;

const handlers: Record<string, Handler> = {
	'schematic.get_info': getSchematicInfo,
	'schematic.add_component': addSchematicComponent,
	'schematic.connect': connectSchematicPins,
	'pcb.get_info': getPcbInfo,
	'pcb.place_component': placePcbComponent,
	'pcb.route_net': routePcbNet,
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

