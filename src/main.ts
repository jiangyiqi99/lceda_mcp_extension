import { dispatchCommand } from './commands';
import { BROKER_WS_URL } from './config';
import { CommandError } from './utils/validation';
import { BrokerClient } from './websocket/client';
import type { ProjectIdentity } from './websocket/protocol';

let client: BrokerClient | undefined;

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
	if (method === 'pcb.place_component' || method === 'pcb.route_net') {
		client?.emitEvent('pcb.changed', { method });
	}
	else if (method === 'schematic.add_component' || method === 'schematic.connect') {
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

