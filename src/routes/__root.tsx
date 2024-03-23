import { Header } from "@/components/header/header";
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
});
