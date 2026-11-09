import { BROKER_HTTP_URL } from '../config';
import { API_CATALOG, API_TYPE_CATALOG } from '../generated/api-catalog';
import { encodeBlobBase64 } from '../utils/base64';
import { CommandError } from '../utils/validation';

const API_PREFIXES = {
	project: ['dmt_'],
	library: ['lib_'],
	panel: ['pnl_'],
	pcb: ['pcb_'],
	schematic: ['sch_'],
	system: ['sys_'],
} as const;
const API_SCOPES = ['project', 'library', 'panel', 'pcb', 'schematic', 'system'] as const;
type ApiScope = typeof API_SCOPES[number];
const BLOCKED_SYSTEM_APIS = new Set(['sys_ClientUrl', 'sys_FileSystem', 'sys_WebSocket']);
const MAX_INLINE_BINARY_BYTES = 8 * 1024 * 1024;

const MUTATING_PREFIXES = [
	'add', 'auto', 'change', 'clear', 'close', 'convertto', 'copy', 'create', 'cut',
	'delete', 'do', 'done', 'generate', 'group', 'highlight', 'import', 'insert',
	'join', 'lock', 'merge', 'modify', 'move', 'open', 'overwrite', 'paste', 'place',
	'rebuild', 'redo', 'remove', 'rename', 'reorder', 'replace', 'reset', 'restore',
	'rotate', 'save',
	'select', 'set', 'split', 'start', 'stop', 'switch', 'sync', 'toggle', 'trigger',
	'destroy', 'dispose', 'hide', 'init', 'push', 'publish', 'register', 'request', 'send',
	'show', 'undo', 'ungroup', 'unhighlight', 'unlock', 'unregister', 'unselect',
	'update', 'upload', 'write',
] as const;
const CALLBACK_METHOD = /(?:Listener|EventListener|subscribe|subscribeOnce|rpcService|setIntervalTimer|setTimeoutTimer)$/i;
const BINARY_METHOD = /^(?:get|export).*(?:File|Files|Image)$/i;
const CALLBACK_MARKER = '__EDA_EVENT_CALLBACK__';
const SUBSCRIPTION_ID_MARKER = '__EDA_SUBSCRIPTION_ID__';
const SUBSCRIPTION_RESULT_MARKER = '__EDA_SUBSCRIPTION_RESULT__';
type EventSink = (event: string, data: unknown) => void;
let eventSink: EventSink | undefined;
const subscriptions = new Map<string, { cancel: () => unknown | Promise<unknown> }>();

export function configureRawApiEventSink(sink: EventSink): void {
	eventSink = sink;
}

export async function listRawEdaApis(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredScope(params);
	const prefixes = API_PREFIXES[scope];
	const names = propertyNames(eda as unknown as object)
		.filter(key => prefixes.some(prefix => key.startsWith(prefix)))
		.filter(key => !BLOCKED_SYSTEM_APIS.has(key))
		.sort();
	return { scope, apis: names };
}

export async function describeRawEdaApi(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredScope(params);
	const api = requiredIdentifier(params, 'api');
	const namespace = resolveNamespace(scope, api);
	const catalog = API_CATALOG[api as keyof typeof API_CATALOG] as
		Record<string, readonly string[]> | undefined;
	const methods = propertyNames(namespace as object)
		.filter(key => typeof Reflect.get(namespace, key) === 'function')
		.sort()
		.map(method => ({
			method,
			signatures: catalog?.[method] ?? [],
			mutating: isMutatingMethod(method),
			supported_by_eda_call: !CALLBACK_METHOD.test(method) && !BINARY_METHOD.test(method),
			binary_result_likely: BINARY_METHOD.test(method),
		}));
	return { scope, api, methods };
}

export async function describeRawEdaType(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const name = requiredIdentifier(params, 'name');
	const declarations = API_TYPE_CATALOG[name as keyof typeof API_TYPE_CATALOG];
	if (!declarations) throw new CommandError('API_TYPE_NOT_FOUND', name);
	return { name, declarations };
}

function propertyNames(value: object): string[] {
	const names = new Set<string>();
	let current: object | null = value;
	while (current && current !== Object.prototype) {
		for (const key of Reflect.ownKeys(current)) {
			if (typeof key === 'string' && key !== 'constructor') names.add(key);
		}
		current = Object.getPrototypeOf(current) as object | null;
	}
	return [...names];
}

export async function exportRawEdaFile(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredScope(params);
	const api = requiredIdentifier(params, 'api');
	const method = requiredIdentifier(params, 'method');
	const args = decodeRawArgs(params.args ?? []);
	if (!Array.isArray(args)) throw new CommandError('INVALID_PARAMS', 'args must be an array');
	const namespace = resolveNamespace(scope, api);
	const callable = Reflect.get(namespace, method);
	if (typeof callable !== 'function') {
		throw new CommandError('API_METHOD_NOT_FOUND', `${api}.${method} was not found`);
	}
	const result = await Reflect.apply(callable, namespace, args) as unknown;
	const requestedName = typeof params.filename === 'string' && params.filename.trim()
		? params.filename.trim()
		: undefined;
	return uploadBinaryResults(result, requestedName, method, params.inline === true);
}

export async function exportRawPrimitiveFile(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredEnum(params, 'scope', ['schematic', 'pcb'] as const);
	const primitiveId = requiredStringValue(params, 'primitive_id');
	const method = requiredIdentifier(params, 'method');
	const args = decodeRawArgs(params.args ?? []);
	if (!Array.isArray(args)) throw new CommandError('INVALID_PARAMS', 'args must be an array');
	const primitive = scope === 'schematic'
		? await eda.sch_Primitive.getPrimitiveByPrimitiveId(primitiveId)
		: await eda.pcb_Primitive.getPrimitiveByPrimitiveId(primitiveId);
	if (!primitive) throw new CommandError('PRIMITIVE_NOT_FOUND', primitiveId);
	const callable = Reflect.get(primitive, method);
	if (typeof callable !== 'function') {
		throw new CommandError('API_METHOD_NOT_FOUND', `${method} was not found on ${primitiveId}`);
	}
	const result = await Reflect.apply(callable, primitive, args) as unknown;
	const requestedName = typeof params.filename === 'string' && params.filename.trim()
		? params.filename.trim()
		: undefined;
	return uploadBinaryResults(result, requestedName, method, params.inline === true);
}

async function uploadBinaryResults(
	result: unknown,
	requestedName: string | undefined,
	fallbackName: string,
	inline: boolean,
): Promise<Record<string, unknown>> {
	const blobs = Array.isArray(result) ? result : [result];
	if (typeof Blob === 'undefined' || blobs.length === 0
		|| blobs.some(item => !(item instanceof Blob))) {
		throw new CommandError('FILE_EXPORT_FAILED', `${fallbackName} did not return File/Blob data`);
	}
	const artifacts: Record<string, unknown>[] = [];
	for (let index = 0; index < blobs.length; index += 1) {
		const blob = blobs[index] as Blob;
		const runtimeName = typeof File !== 'undefined' && blob instanceof File
			? blob.name
			: undefined;
		const filename = numberedFilename(
			requestedName ?? runtimeName ?? `${fallbackName}.bin`,
			index,
			blobs.length,
		);
		artifacts.push(await uploadBlob(blob, filename, inline));
	}
	return { artifacts };
}

async function uploadBlob(
	result: Blob,
	filename: string,
	inline: boolean,
): Promise<Record<string, unknown>> {
	if (inline) {
		const encoded = await encodeBlobBase64(result);
		return {
			filename,
			media_type: result.type || 'application/octet-stream',
			size_bytes: encoded.sizeBytes,
			data_base64: encoded.dataBase64,
		};
	}
	// Legacy HTTP artifact upload fallback. Remove after the next major protocol
	// version; current MCP transports request inline Base64 through WebSocket RPC.
	const response = await eda.sys_ClientUrl.request(
		`${BROKER_HTTP_URL}/upload/artifact?filename=${encodeURIComponent(filename)}`,
		'POST',
		result,
		{ headers: { 'Content-Type': result.type || 'application/octet-stream' } },
	);
	if (!response.ok) {
		throw new CommandError(
			'ARTIFACT_UPLOAD_FAILED',
			`Backend returned HTTP ${response.status}`,
			await response.text(),
		);
	}
	return await response.json() as Record<string, unknown>;
}

function numberedFilename(filename: string, index: number, total: number): string {
	if (total === 1) return filename;
	const dot = filename.lastIndexOf('.');
	return dot > 0
		? `${filename.slice(0, dot)}-${index + 1}${filename.slice(dot)}`
		: `${filename}-${index + 1}`;
}

export async function subscribeRawEdaEvent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredScope(params);
	const api = requiredIdentifier(params, 'api');
	const method = requiredIdentifier(params, 'method');
	const subscriptionId = requiredIdentifier(params, 'subscription_id');
	if (subscriptions.has(subscriptionId)) {
		throw new CommandError('SUBSCRIPTION_EXISTS', subscriptionId);
	}
	const args = params.args;
	const unsubscribeMethod = params.unsubscribe_method === undefined
		? undefined
		: requiredIdentifier(params, 'unsubscribe_method');
	const unsubscribeArgs = params.unsubscribe_args ?? [];
	if (!Array.isArray(args) || !containsCallbackMarker(args)) {
		throw new CommandError(
			'INVALID_PARAMS',
			`args must contain ${CALLBACK_MARKER} at the callback position`,
		);
	}
	if (!Array.isArray(unsubscribeArgs)) {
		throw new CommandError('INVALID_PARAMS', 'unsubscribe_args must be an array');
	}
	const namespace = resolveNamespace(scope, api);
	const callable = Reflect.get(namespace, method);
	if (typeof callable !== 'function') {
		throw new CommandError('API_METHOD_NOT_FOUND', `${api}.${method} was not found`);
	}
	const callback = (...eventArgs: unknown[]): void => {
		eventSink?.('eda.api_event', {
			subscription_id: subscriptionId,
			api,
			method,
			args: eventArgs.map(value => safeEventValue(value)),
		});
	};
	const callArgs = args.map(value => replaceCallbackMarkers(value, callback));
	const registrationResult = await Reflect.apply(callable, namespace, callArgs) as unknown;
	const cancel = buildSubscriptionCancel(
		namespace,
		method,
		subscriptionId,
		registrationResult,
		unsubscribeMethod,
		unsubscribeArgs,
	);
	subscriptions.set(subscriptionId, { cancel });
	return { subscribed: true, subscription_id: subscriptionId, api, method };
}

function containsCallbackMarker(value: unknown): boolean {
	if (value === CALLBACK_MARKER) return true;
	if (Array.isArray(value)) return value.some(containsCallbackMarker);
	return typeof value === 'object' && value !== null
		? Object.values(value).some(containsCallbackMarker)
		: false;
}

function replaceCallbackMarkers(value: unknown, callback: (...args: unknown[]) => void): unknown {
	if (value === CALLBACK_MARKER) return callback;
	if (Array.isArray(value)) return value.map(item => replaceCallbackMarkers(item, callback));
	if (typeof value !== 'object' || value === null) return decodeRawArgs(value);
	return Object.fromEntries(
		Object.entries(value).map(([key, item]) => [key, replaceCallbackMarkers(item, callback)]),
	);
}

export async function unsubscribeRawEdaEvent(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const subscriptionId = requiredIdentifier(params, 'subscription_id');
	const subscription = subscriptions.get(subscriptionId);
	if (!subscription) return { unsubscribed: false, subscription_id: subscriptionId };
	const result = await subscription.cancel();
	subscriptions.delete(subscriptionId);
	return { unsubscribed: result !== false, subscription_id: subscriptionId };
}

function buildSubscriptionCancel(
	namespace: object,
	method: string,
	subscriptionId: string,
	registrationResult: unknown,
	unsubscribeMethod: string | undefined,
	unsubscribeArgs: unknown[],
): () => unknown | Promise<unknown> {
	if (unsubscribeMethod) {
		return () => {
			const callable = Reflect.get(namespace, unsubscribeMethod);
			if (typeof callable !== 'function') return false;
			const args = unsubscribeArgs.map(value => {
				if (value === SUBSCRIPTION_ID_MARKER) return subscriptionId;
				if (value === SUBSCRIPTION_RESULT_MARKER) return registrationResult;
				return decodeRawArgs(value);
			});
			return Reflect.apply(callable, namespace, args);
		};
	}
	if (typeof registrationResult === 'object' && registrationResult !== null) {
		const cancel = Reflect.get(registrationResult, 'cancel');
		if (typeof cancel === 'function') {
			return () => Reflect.apply(cancel, registrationResult, []);
		}
	}
	const timerClearMethod = method === 'setIntervalTimer'
		? 'clearIntervalTimer'
		: method === 'setTimeoutTimer' ? 'clearTimeoutTimer' : undefined;
	if (timerClearMethod) {
		return () => {
			const callable = Reflect.get(namespace, timerClearMethod);
			return typeof callable === 'function'
				? Reflect.apply(callable, namespace, [registrationResult])
				: false;
		};
	}
	const remove = Reflect.get(namespace, 'removeEventListener');
	if (typeof remove === 'function') {
		const removalTarget = method === 'addEventListener' && registrationResult !== undefined
			? registrationResult
			: subscriptionId;
		return () => Reflect.apply(remove, namespace, [removalTarget]);
	}
	return () => false;
}

function safeEventValue(value: unknown): unknown {
	try {
		return jsonSafe(value, 'EDA event');
	}
	catch {
		return String(value);
	}
}

/**
 * Invoke a JSON-safe JLCEDA API as an escape hatch for APIs that do not yet
 * have a dedicated MCP tool. Binary/file and callback APIs require a separate
 * transport and are deliberately rejected here.
 */
export async function callRawEdaApi(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredScope(params);
	const api = requiredIdentifier(params, 'api');
	const method = requiredIdentifier(params, 'method');
	const args = decodeRawArgs(params.args ?? []);
	if (!Array.isArray(args)) {
		throw new CommandError('INVALID_PARAMS', 'args must be an array');
	}
	if (CALLBACK_METHOD.test(method)) {
		throw new CommandError(
			'CALLBACK_API_REQUIRES_SUBSCRIPTION',
			`${api}.${method} requires the event subscription transport`,
		);
	}
	if (BINARY_METHOD.test(method)) {
		throw new CommandError(
			'FILE_API_REQUIRES_TRANSFER',
			`${api}.${method} requires the binary file transfer transport`,
		);
	}
	const mutating = isMutatingMethod(method);
	if (mutating && params.confirm_mutation !== true) {
		throw new CommandError(
			'MUTATION_CONFIRMATION_REQUIRED',
			`${api}.${method} may change EDA state; set confirm_mutation=true`,
		);
	}

	const namespace = resolveNamespace(scope, api);
	const callable = Reflect.get(namespace, method);
	if (typeof callable !== 'function') {
		throw new CommandError('API_METHOD_NOT_FOUND', `${api}.${method} was not found`);
	}

	const result = await Reflect.apply(callable, namespace, args);
	if (mutating) {
		eventSink?.(`${scope}.changed`, { method: 'eda.call', api, api_method: method });
	}
	return {
		api,
		method,
		mutating,
		result: jsonSafe(result, `${api}.${method}`),
	};
}

export async function callRawPrimitive(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const scope = requiredEnum(params, 'scope', ['schematic', 'pcb'] as const);
	const primitiveId = requiredStringValue(params, 'primitive_id');
	const calls = params.calls;
	if (!Array.isArray(calls) || calls.length === 0) {
		throw new CommandError('INVALID_PARAMS', 'calls must be a non-empty array');
	}
	const transaction = params.transaction === true;
	const parsedCalls = calls.map((item, index) => {
		if (typeof item !== 'object' || item === null || Array.isArray(item)) {
			throw new CommandError('INVALID_PARAMS', `calls[${index}] must be an object`);
		}
		const record = item as Record<string, unknown>;
		const method = requiredIdentifier(record, 'method');
		if (['toAsync', 'done', 'reset'].includes(method)) {
			throw new CommandError('INVALID_PARAMS', `${method} is managed by transaction mode`);
		}
		const args = decodeRawArgs(record.args ?? []);
		if (!Array.isArray(args)) {
			throw new CommandError('INVALID_PARAMS', `calls[${index}].args must be an array`);
		}
		return { method, args };
	});
	const mutating = transaction || parsedCalls.some(call => isMutatingMethod(call.method));
	if (mutating && params.confirm_mutation !== true) {
		throw new CommandError(
			'MUTATION_CONFIRMATION_REQUIRED',
			'Primitive calls may change EDA state; set confirm_mutation=true',
		);
	}
	const primitive = scope === 'schematic'
		? await eda.sch_Primitive.getPrimitiveByPrimitiveId(primitiveId)
		: await eda.pcb_Primitive.getPrimitiveByPrimitiveId(primitiveId);
	if (!primitive) throw new CommandError('PRIMITIVE_NOT_FOUND', primitiveId);
	let target: object = primitive;
	if (transaction) {
		const toAsync = Reflect.get(primitive, 'toAsync');
		if (typeof toAsync !== 'function') {
			throw new CommandError('TRANSACTION_UNSUPPORTED', `${primitiveId} has no toAsync()`);
		}
		target = Reflect.apply(toAsync, primitive, []) as object;
	}
	const results: unknown[] = [];
	for (const call of parsedCalls) {
		const callable = Reflect.get(target, call.method);
		if (typeof callable !== 'function') {
			throw new CommandError('API_METHOD_NOT_FOUND', `${call.method} was not found on ${primitiveId}`);
		}
		results.push(await Reflect.apply(callable, target, call.args));
	}
	let committed: unknown;
	if (transaction) {
		const done = Reflect.get(target, 'done');
		if (typeof done !== 'function') {
			throw new CommandError('TRANSACTION_UNSUPPORTED', `${primitiveId} has no done()`);
		}
		committed = await Reflect.apply(done, target, []);
	}
	if (mutating) {
		eventSink?.(`${scope}.changed`, { method: 'eda.call_primitive', primitive_id: primitiveId });
	}
	return {
		scope,
		primitive_id: primitiveId,
		transaction,
		mutating,
		results: jsonSafe(results, `${primitiveId} primitive calls`),
		committed: transaction ? jsonSafe(committed, `${primitiveId} transaction`) : undefined,
	};
}

function jsonSafe(value: unknown, label: string): unknown {
	try {
		const serialized = JSON.stringify(normalizeJsonValue(value, label, new WeakSet<object>()));
		if (serialized === undefined) return null;
		return JSON.parse(serialized) as unknown;
	}
	catch (error: unknown) {
		throw new CommandError(
			'NON_JSON_RESULT',
			`${label} returned a value that cannot be serialized`,
			error instanceof Error ? error.message : String(error),
		);
	}
}

function normalizeJsonValue(value: unknown, label: string, seen: WeakSet<object>): unknown {
	if (value === undefined) return null;
	if (value === null || typeof value === 'string' || typeof value === 'number'
		|| typeof value === 'boolean') return value;
	if (typeof Blob !== 'undefined' && value instanceof Blob) {
		throw new CommandError(
			'BINARY_RESULT_REQUIRES_TRANSFER',
			`${label} returned Blob/File data; use eda.export_file`,
		);
	}
	if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
		throw new CommandError('NON_JSON_RESULT', `${label} returned a non-JSON value`);
	}
	if (seen.has(value)) return '[Circular]';
	seen.add(value);
	if (Array.isArray(value)) {
		const output = value.map(item => normalizeJsonValue(item, label, seen));
		seen.delete(value);
		return output;
	}

	const stateOutput: Record<string, unknown> = {};
	for (const getterName of propertyNames(value)) {
		if (!getterName.startsWith('getState_')) continue;
		const getter = Reflect.get(value, getterName);
		if (typeof getter !== 'function') continue;
		try {
			const stateValue = Reflect.apply(getter, value, []) as unknown;
			if (stateValue !== undefined) {
				const property = getterName.slice('getState_'.length);
				const key = property.charAt(0).toLowerCase() + property.slice(1);
				stateOutput[key] = normalizeJsonValue(stateValue, label, seen);
			}
		}
		catch { /* unavailable state getter */ }
	}
	if (Object.keys(stateOutput).length > 0) {
		seen.delete(value);
		return stateOutput;
	}

	const output: Record<string, unknown> = {};
	for (const [key, item] of Object.entries(value)) {
		output[key] = normalizeJsonValue(item, label, seen);
	}
	seen.delete(value);
	return output;
}

function isMutatingMethod(method: string): boolean {
	const normalized = method.toLowerCase();
	return MUTATING_PREFIXES.some(prefix => normalized.startsWith(prefix));
}

function requiredScope(record: Record<string, unknown>): ApiScope {
	return requiredEnum(record, 'scope', API_SCOPES);
}

function resolveNamespace(scope: ApiScope, api: string): object {
	if (!API_PREFIXES[scope].some(prefix => api.startsWith(prefix))) {
		throw new CommandError('API_SCOPE_MISMATCH', `${api} is not in the ${scope} API scope`);
	}
	if (BLOCKED_SYSTEM_APIS.has(api)) {
		throw new CommandError(
			'API_BLOCKED',
			`${api} is reserved for the Extension/Broker transport and host protection`,
		);
	}
	const namespace = Reflect.get(eda as unknown as object, api) as unknown;
	if ((typeof namespace !== 'object' && typeof namespace !== 'function') || namespace === null) {
		throw new CommandError('API_NOT_FOUND', `JLCEDA API namespace ${api} was not found`);
	}
	return namespace as object;
}

function decodeRawArgs(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(decodeRawArgs);
	if (typeof value !== 'object' || value === null) return value;
	const record = value as Record<string, unknown>;
	if ('$file_base64' in record) {
		const encoded = record.$file_base64;
		if (typeof encoded !== 'string') {
			throw new CommandError('INVALID_BINARY_INPUT', '$file_base64 must be a string');
		}
		const estimatedBytes = Math.floor(encoded.length * 3 / 4);
		if (estimatedBytes > MAX_INLINE_BINARY_BYTES) {
			throw new CommandError(
				'BINARY_INPUT_TOO_LARGE',
				`Inline binary input exceeds ${MAX_INLINE_BINARY_BYTES} bytes`,
			);
		}
		let binary: string;
		try { binary = atob(encoded); }
		catch { throw new CommandError('INVALID_BINARY_INPUT', '$file_base64 is not valid base64'); }
		const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
		const name = typeof record.name === 'string' && record.name.trim()
			? record.name.trim()
			: 'mcp-upload.bin';
		const type = typeof record.type === 'string' ? record.type : 'application/octet-stream';
		return new File([bytes], name, { type });
	}
	return Object.fromEntries(Object.entries(record).map(([key, item]) => [key, decodeRawArgs(item)]));
}

function requiredStringValue(record: Record<string, unknown>, key: string): string {
	const value = record[key];
	if (typeof value !== 'string' || value.trim() === '') {
		throw new CommandError('INVALID_PARAMS', `${key} must be a non-empty string`);
	}
	return value.trim();
}

function requiredIdentifier(record: Record<string, unknown>, key: string): string {
	const value = record[key];
	if (typeof value !== 'string' || !/^[A-Za-z][A-Za-z0-9_]*$/.test(value)) {
		throw new CommandError('INVALID_PARAMS', `${key} must be an API identifier`);
	}
	return value;
}

function requiredEnum<T extends string>(
	record: Record<string, unknown>,
	key: string,
	allowed: readonly T[],
): T {
	const value = record[key];
	if (typeof value !== 'string' || !allowed.includes(value as T)) {
		throw new CommandError('INVALID_PARAMS', `${key} must be one of: ${allowed.join(', ')}`);
	}
	return value as T;
}
