import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: Root,
  validateSearch: (search) => {
    const todoSearch = typeof search.todoSearch === "string" ? search.todoSearch : null;

    return { todoSearch };
  },
});

function Root() {
  return (
    <>
      <div className="bg-[url(assets/cover1.jpg)] bg-cover flex flex-col gap-4 grow h-full">
        {" "}
        <Outlet />
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
