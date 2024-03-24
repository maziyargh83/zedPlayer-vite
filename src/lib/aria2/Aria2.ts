import { WebSocket } from "../libaria2";

export const aria2Client = new WebSocket.Client({
  host: "localhost",

  port: 6800,
  auth: {
    secret: "123456",
  },
});
