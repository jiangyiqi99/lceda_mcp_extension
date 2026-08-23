export interface ProjectIdentity {
	projectId: string;
	projectName: string;
	projectUuid: string;
}

export interface RpcRequest {
	id: string;
	type: 'request';
	method: string;
	params: Record<string, unknown>;
}

export interface RegisteredMessage {
	type: 'registered';
	project_id: string;
}

export interface HeartbeatAckMessage {
	type: 'heartbeat_ack';
	project_id?: string;
	registered?: boolean;
}

export type BrokerMessage = RpcRequest | RegisteredMessage | HeartbeatAckMessage;

export function isRpcRequest(value: unknown): value is RpcRequest {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	const record = value as Record<string, unknown>;
	return record.type === 'request'
		&& typeof record.id === 'string'
		&& typeof record.method === 'string'
		&& typeof record.params === 'object'
		&& record.params !== null
		&& !Array.isArray(record.params);
}

