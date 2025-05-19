import { Route as Home } from "../routes/index";
import { useRouter } from "@tanstack/react-router";
import { useDebounceCallback } from "usehooks-ts";

export default function Search() {
  const search = Home.useSearch();

  const router = useRouter();
  const debouncedNavigate = useDebounceCallback((value: string) => {
    router.navigate({ to: ".", search: { todoSearch: value }, replace: true });
  }, 1000);

  return (
    <div className="w-full max-w-sm min-w-[200px] p-4">
      <div className="relative">
        <input
          defaultValue={search.todoSearch ?? ""}
          onChange={(e) => debouncedNavigate(e.target.value)}
          className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="todos..."
        />
        <button
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}
