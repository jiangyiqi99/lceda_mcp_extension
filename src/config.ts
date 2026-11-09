export const BROKER_WS_URL = 'ws://127.0.0.1:8000/ws';
// Legacy HTTP upload fallback for pre-0.4 clients; remove in the next major
// protocol version after all MCP transports use inline Base64 over WebSocket.
export const BROKER_HTTP_URL = 'http://127.0.0.1:8000';
export const WEBSOCKET_ID = 'jlceda-ai-agent';
export const HEARTBEAT_INTERVAL_MS = 10_000;
export const RECONNECT_DELAY_MS = 3_000;
// Keep this below the broker's default 30 second RPC timeout so the extension
// can return a structured error instead of leaving the broker to time out.
export const COMMAND_TIMEOUT_MS = 25_000;
export const CAPABILITIES = ['schematic', 'pcb', 'capture', 'drc'] as const;
