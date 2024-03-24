import { Header } from "@/components/header/header";
import { aria2Client } from "@/lib/aria2/Aria2";
import { ReadyLocalStorage } from "@/lib/db/localDB";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  beforeLoad: async () => {
    const res = await ReadyLocalStorage();
    return {
      isReady: res,
    };
  },
});
