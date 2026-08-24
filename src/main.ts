import { dispatchCommand } from './commands';
import { BROKER_WS_URL } from './config';
import { CommandError } from './utils/validation';
import { BrokerClient } from './websocket/client';
import type { ProjectIdentity } from './websocket/protocol';
import { configureRawApiEventSink } from './commands/raw-api';

let client: BrokerClient | undefined;
let messageBusRegistered = false;

configureRawApiEventSink((event, data) => client?.emitEvent(event, data));

const STATUS_TOPIC = 'jlceda-ai-agent-status';
const CONTROL_TOPIC = 'jlceda-ai-agent-control';

interface ConnectionStatus {
	connected: boolean;
	projectId?: string;
}

interface ControlRequest {
	command: 'reconnect';
}

interface ControlResponse extends ConnectionStatus {
	handled: boolean;
}

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
	'schematic.modify_wire', 'schematic.modify_pin', 'schematic.modify_net_label',
	'schematic.modify_net_marker',
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

function getConnectionStatus(): ConnectionStatus {
	return {
		connected: client?.isConnected() ?? false,
		projectId: client?.getProjectId(),
	};
}

function reconnectClient(): void {
	if (!client) {
		client = new BrokerClient(BROKER_WS_URL, getCurrentProject, dispatchAndEmit);
	}
	client.connect();
}

function ensureMessageBusServices(): void {
	if (messageBusRegistered) return;
	eda.sys_MessageBus.rpcService(STATUS_TOPIC, () => getConnectionStatus());
	eda.sys_MessageBus.rpcService(
		CONTROL_TOPIC,
		(request?: ControlRequest): ControlResponse => {
			if (request?.command === 'reconnect') reconnectClient();
			return { handled: true, ...getConnectionStatus() };
		},
	);
	messageBusRegistered = true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {
	ensureMessageBusServices();
	client?.stop();
	client = new BrokerClient(BROKER_WS_URL, getCurrentProject, dispatchAndEmit);
	client.connect();
}

export function deactivate(): void {
	client?.stop();
	client = undefined;
}

export async function reconnect(): Promise<void> {
	try {
		const response = await eda.sys_MessageBus.rpcCall(
			CONTROL_TOPIC,
			{ command: 'reconnect' } satisfies ControlRequest,
			500,
		) as ControlResponse;
		if (response?.handled) return;
	}
	catch { /* fall back to the current extension context */ }
	ensureMessageBusServices();
	reconnectClient();
}

export async function showStatus(): Promise<void> {
	let connection = getConnectionStatus();
	try {
		connection = await eda.sys_MessageBus.rpcCall(
			STATUS_TOPIC,
			undefined,
			500,
		) as ConnectionStatus;
	}
	catch { /* use the current context when no background service is available */ }
	const status = connection.connected ? '已连接' : '未连接';
	const projectId = connection.projectId ?? '无';
	eda.sys_Dialog.showInformationMessage(
		`Broker: ${status}\nProject ID: ${projectId}\nWebSocket: ${BROKER_WS_URL}`,
		'JLCEDA AI Agent',
	);
}
