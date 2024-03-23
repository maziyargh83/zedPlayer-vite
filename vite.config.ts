import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

import Naria2 from "vite-plugin-naria2";
import TopLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    TopLevelAwait(), // Used for transforming the top-level await syntax
    Naria2({
      childProcess: {
        log: "./aria2.log", // Used for debug
        environment: "ignore", // Ignore proxy environment variables
        rpc: {
          secret: "123456", // Use the fixed secret, or generate under the hood
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
