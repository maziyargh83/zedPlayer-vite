import { createClient } from "naria2";

export const aria2Client = await createClient(
  new WebSocket("ws://localhost:6800/jsonrpc"),
  {
    secret: "123456",
  }
);
