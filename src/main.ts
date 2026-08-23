import { dispatchCommand } from './commands';
import { BROKER_WS_URL } from './config';
import { CommandError } from './utils/validation';
import { BrokerClient } from './websocket/client';
import type { ProjectIdentity } from './websocket/protocol';

let client: BrokerClient | undefined;

const PCB_MUTATIONS = new Set([
	'pcb.place_component', 'pcb.modify_component', 'pcb.delete_components',
	'pcb.create_track', 'pcb.modify_track', 'pcb.create_board_outline',
	'pcb.create_via', 'pcb.modify_via',
	'pcb.delete_routing_primitives', 'pcb.clear_routing', 'pcb.route_net', 'pcb.auto_route',
	'pcb.auto_layout',
]);
const SCHEMATIC_MUTATIONS = new Set([
	'schematic.add_component', 'schematic.place_component', 'schematic.modify_component',
	'schematic.delete_components', 'schematic.delete_wires', 'schematic.clear',
	'schematic.modify_wire', 'schematic.set_pin_no_connect',
	'schematic.create_net_flag', 'schematic.create_net_port', 'schematic.create_net_label',
	'schematic.connect_net', 'schematic.create_wire', 'schematic.connect',
	'schematic.auto_layout', 'schematic.auto_route',
]);

async function getCurrentProject(): Promise<ProjectIdentity> {
	const project = await eda.dmt_Project.getCurrentProjectInfo();
	if (!project) {
		throw new CommandError(
			'NO_ACTIVE_PROJECT',
			'请先在嘉立创 EDA 中打开一个工程，再连接 AI Broker',
		);
	}
	return {
		projectId: project.uuid,
		projectName: project.name,
		projectUuid: project.uuid,
	};
}

async function dispatchAndEmit(
	method: string,
	params: Record<string, unknown>,
): Promise<unknown> {
	const result = await dispatchCommand(method, params);
	if (PCB_MUTATIONS.has(method)) {
		client?.emitEvent('pcb.changed', { method });
	}
	else if (SCHEMATIC_MUTATIONS.has(method)) {
		client?.emitEvent('schematic.changed', { method });
	}
	return result;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {
	client?.stop();
	client = new BrokerClient(BROKER_WS_URL, getCurrentProject, dispatchAndEmit);
	client.connect();
}

export function deactivate(): void {
	client?.stop();
	client = undefined;
}

export function reconnect(): void {
	if (!client) {
		activate();
		return;
	}
	client.connect();
}

export function showStatus(): void {
	const status = client?.isConnected() ? '已连接' : '未连接';
	const projectId = client?.getProjectId() ?? '无';
	eda.sys_Dialog.showInformationMessage(
		`Broker: ${status}\nProject ID: ${projectId}\nWebSocket: ${BROKER_WS_URL}`,
		'JLCEDA AI Agent',
	);
}
