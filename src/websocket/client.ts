import {
	CAPABILITIES,
	COMMAND_TIMEOUT_MS,
	HEARTBEAT_INTERVAL_MS,
	RECONNECT_DELAY_MS,
	WEBSOCKET_ID,
} from '../config';
import { logger } from '../utils/logger';
import { CommandError } from '../utils/validation';
import { isRpcRequest, type ProjectIdentity } from './protocol';

export type CommandDispatcher = (
	method: string,
	params: Record<string, unknown>,
) => Promise<unknown>;

export type ProjectProvider = () => Promise<ProjectIdentity>;

export class BrokerClient {
	private heartbeatTimer: ReturnType<typeof setInterval> | undefined;
	private reconnectTimer: ReturnType<typeof setTimeout> | undefined;
	private identity: ProjectIdentity | undefined;
	private connected = false;
	private stopped = false;
	private readonly extensionId = createExtensionId();

	constructor(
		private readonly websocketUrl: string,
		private readonly projectProvider: ProjectProvider,
		private readonly dispatch: CommandDispatcher,
	) {}

	connect(): void {
		this.stopped = false;
		this.clearReconnectTimer();
		try {
			eda.sys_WebSocket.close(WEBSOCKET_ID);
		}
		catch { /* connection may not exist yet */ }

		try {
			eda.sys_WebSocket.register(
				WEBSOCKET_ID,
				this.websocketUrl,
				async (event: MessageEvent<unknown>) => this.onMessage(event),
				async () => this.onConnected(),
			);
		}
		catch (error: unknown) {
			this.handleConnectionFailure(error);
		}
	}

	stop(): void {
		this.stopped = true;
		this.connected = false;
		this.clearReconnectTimer();
		this.stopHeartbeat();
		try {
			eda.sys_WebSocket.close(WEBSOCKET_ID, 1000, 'extension stopped');
		}
		catch { /* already closed */ }
	}

	isConnected(): boolean {
		return this.connected;
	}

	getProjectId(): string | undefined {
		return this.identity?.projectId;
	}

	emitEvent(event: string, data?: unknown): void {
		if (!this.connected || !this.identity) {
			return;
		}
		this.send({
			type: 'event',
			event,
			project_id: this.identity.projectId,
			data,
		});
	}

	private async onConnected(): Promise<void> {
		try {
			this.identity = await this.projectProvider();
			this.sendRegistration(this.identity);
			this.connected = true;
			this.startHeartbeat();
			logger.info(`Connected to broker for ${this.identity.projectName}`);
		}
		catch (error: unknown) {
			this.handleConnectionFailure(error);
		}
	}

	private async onMessage(event: MessageEvent<unknown>): Promise<void> {
		if (typeof event.data !== 'string') {
			logger.warn('Ignoring non-text WebSocket message');
			return;
		}

		let message: unknown;
		try {
			message = JSON.parse(event.data) as unknown;
		}
		catch {
			logger.warn('Ignoring invalid JSON from broker');
			return;
		}

		if (isRpcRequest(message)) {
			// Some canvas mutations (notably the beta createNetLabel API) only
			// settle after JLCEDA regains control from the WebSocket callback.
			// Start the command on the next turn instead of keeping this callback
			// open for the entire RPC lifetime.
			setTimeout(() => {
				void this.handleRequest(message.id, message.method, message.params);
			}, 0);
			return;
		}

		if (typeof message === 'object' && message !== null) {
			const type = Reflect.get(message, 'type');
			if (type === 'registered') {
				this.connected = true;
			}
		}
	}

	private async handleRequest(
		id: string,
		method: string,
		params: Record<string, unknown>,
	): Promise<void> {
		try {
			const result = await this.dispatchWithTimeout(method, params);
			this.send({ id, type: 'response', success: true, result });
		}
		catch (error: unknown) {
			const commandError = error instanceof CommandError
				? error
				: new CommandError(
					'EDA_API_ERROR',
					error instanceof Error ? error.message : String(error),
				);
			logger.error(`${method} failed: ${commandError.message}`);
			this.send({
				id,
				type: 'response',
				success: false,
				error: {
					code: commandError.code,
					message: commandError.message,
					data: commandError.data,
				},
			});
		}
	}

	private async dispatchWithTimeout(
		method: string,
		params: Record<string, unknown>,
	): Promise<unknown> {
		let timeoutTimer: ReturnType<typeof setTimeout> | undefined;
		const timeout = new Promise<never>((_resolve, reject) => {
			timeoutTimer = setTimeout(() => {
				reject(new CommandError(
					'EXTENSION_COMMAND_TIMEOUT',
					`${method} did not complete within ${COMMAND_TIMEOUT_MS}ms`,
					{ method, timeout_ms: COMMAND_TIMEOUT_MS },
				));
			}, COMMAND_TIMEOUT_MS);
		});

		try {
			return await Promise.race([this.dispatch(method, params), timeout]);
		}
		finally {
			if (timeoutTimer !== undefined) clearTimeout(timeoutTimer);
		}
	}

	private startHeartbeat(): void {
		this.stopHeartbeat();
		this.heartbeatTimer = setInterval(() => {
			void this.sendHeartbeat();
		}, HEARTBEAT_INTERVAL_MS);
	}

	private stopHeartbeat(): void {
		if (this.heartbeatTimer !== undefined) {
			clearInterval(this.heartbeatTimer);
			this.heartbeatTimer = undefined;
		}
	}

	private async sendHeartbeat(): Promise<void> {
		try {
			const currentIdentity = await this.projectProvider();
			if (!this.identity || currentIdentity.projectId !== this.identity.projectId) {
				this.identity = currentIdentity;
				this.sendRegistration(currentIdentity);
			}
			this.send({ type: 'heartbeat', project_id: currentIdentity.projectId });
		}
		catch (error: unknown) {
			this.handleConnectionFailure(error);
		}
	}

	private sendRegistration(identity: ProjectIdentity): void {
		this.send({
			type: 'register',
			extension_id: this.extensionId,
			project_id: identity.projectId,
			project_name: identity.projectName,
			project_uuid: identity.projectUuid,
			capabilities: [...CAPABILITIES],
		});
	}

	private send(message: Record<string, unknown>): void {
		eda.sys_WebSocket.send(WEBSOCKET_ID, JSON.stringify(message));
	}

	private handleConnectionFailure(error: unknown): void {
		this.connected = false;
		this.stopHeartbeat();
		logger.warn('Broker connection failed', error);
		if (this.stopped || this.reconnectTimer !== undefined) {
			return;
		}
		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = undefined;
			this.connect();
		}, RECONNECT_DELAY_MS);
	}

	private clearReconnectTimer(): void {
		if (this.reconnectTimer !== undefined) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = undefined;
		}
	}
}

function createExtensionId(): string {
	try {
		return crypto.randomUUID();
	}
	catch {
		return `jlceda-${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}
}
