import { open } from "maria2";

export const conn = await open(new WebSocket("ws://localhost:6800/jsonrpc"));
