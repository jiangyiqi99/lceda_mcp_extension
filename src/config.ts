export const BROKER_WS_URL = 'ws://127.0.0.1:8000/ws';
export const BROKER_HTTP_URL = 'http://127.0.0.1:8000';
export const WEBSOCKET_ID = 'jlceda-ai-agent';
export const HEARTBEAT_INTERVAL_MS = 10_000;
export const RECONNECT_DELAY_MS = 3_000;
// Keep this below the broker's default 30 second RPC timeout so the extension
// can return a structured error instead of leaving the broker to time out.
export const COMMAND_TIMEOUT_MS = 25_000;
export const CAPABILITIES = ['schematic', 'pcb', 'capture', 'drc'] as const;
