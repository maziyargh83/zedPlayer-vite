import { useSyncExternalStore } from "react";
import { WebSocket } from "../libaria2";
const Aria2 = () => {
  const aria2Client = new WebSocket.Client({
    host: "localhost",
    port: 6800,
    auth: {
      secret: "123456",
    },
  });
  const subscribers = new Set<() => void>();
  let connection = false;
  function connectionListener() {
    aria2Client.removeAllListeners();
    aria2Client.on("ws.open", () => {
      connection = true;
      subscribers.forEach((cb) => cb());
      console.log("connect");
    });
    aria2Client.on("ws.close", () => {
      connection = false;
      subscribers.forEach((cb) => cb());
      console.log("disconnect");
    });
  }

  // Initial connection setup
  connectionListener();
  function subscribe(onStoreChange: () => void) {
    subscribers.add(onStoreChange);
    return () => {
      subscribers.delete(onStoreChange);
    };
  }
  function getAriaClient() {
    return aria2Client;
  }
  function getConnectionStatus(): boolean {
    return connection;
  }
  return {
    subscribe,
    getAriaClient,
    getConnectionStatus,
  };
};

export const aria2 = Aria2();
export const aria2Client = aria2.getAriaClient();

export const useAria2Connection = () => {
  return useSyncExternalStore(aria2.subscribe, () =>
    aria2.getConnectionStatus()
  );
};
