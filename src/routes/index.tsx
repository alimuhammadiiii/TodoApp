import { createFileRoute } from "@tanstack/react-router";
import Search from "../components/search";
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";
import { TodosProvider } from "../hooks/useTodoContext";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col h-full gap-3">
      <TodosProvider>
        <Header />
        <Todos />
        <Footer />
      </TodosProvider>
    </div>
  );
}

function Header() {
  return (
    <>
      <Search />
      {/* <Sorting /> */}
    </>
  );
}

function Footer() {
  return (
    <>
      <AddTodo />
    </>
  );
}
