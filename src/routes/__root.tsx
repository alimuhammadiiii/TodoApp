import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import { useState } from "react";

export const Route = createRootRoute({
  component: Root,
  // validateSearch: (search) => {
  //   const todoSearch = typeof search.todoSearch === "string" ? search.todoSearch : null;

  //   return { todoSearch };
  // },
});

function Root() {
  // const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="h-full w-full flex">
        {/* <div
          className={`bg-gray-800 ${isOpen ? "w-[350px]" : "w-[50px]"} transition-all ease-in-out duration-300 text-white`}
        >
          <p>SideBar</p>
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "close" : "open"}</button>
        </div> */}
        <div className="bg-[url(assets/cover1.jpg)] bg-cover flex flex-col p-4 gap-4 grow">
          {" "}
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
