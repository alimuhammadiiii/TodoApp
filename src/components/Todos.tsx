import { useMemo, useRef, useState, type ReactNode } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useTodos, useTodosDispatch } from "../hooks/useTodoContext";
import { Route as Home } from "../routes/index";
import { MdDone } from "react-icons/md";
import type { Todo } from "../hooks/useTodoContext";

export default function Todos() {
  const [filter, setFilter] = useState<"default" | "complete" | "inProgress">("default");
  const [sortType, setSortType] = useState<"none" | "date" | "alphabet">("none");
  const todos = useTodos();
  const search = Home.useSearch();
  const filteredTodos = todos.filter((todo) => {
    return todo.text.includes(search.todoSearch ?? "");
  });

  const visibleTodos = useMemo(() => {
    let result = filteredTodos.filter((todo) => {
      if (filter === "complete") {
        return todo.isComplete;
      }
      if (filter === "inProgress") {
        return !todo.isComplete;
      }

      return true;
    });

    if (sortType === "alphabet") {
      return (result = [...result].sort((a, b) => a.text.localeCompare(b.text)));
    } else if (sortType === "date") {
      return (result = [...result].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    }
    return result;
  }, [filter, filteredTodos, sortType]);
  console.log(visibleTodos);

  return (
    <>
      <TodoFilter defaultValue={filter} onChangeValue={setFilter} />
      <FilterBySort defaultValue={sortType} onchangeSort={setSortType} />
      <ul className="grow overflow-y-auto flex flex-col gap-2 p-3 mb-14">
        {visibleTodos.map((todo: Todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </>
  );
}

function TodoItem({ todo }: { todo: Todo }) {
  const dispatchTodos = useTodosDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todo.isEdit) {
      inputRef.current?.focus();
    }
  }, [todo.isEdit]);

  return (
    <li
      key={todo.id}
      className="flex bg-white/30 backdrop-blur-md justify-center items-center gap-1.5  rounded  p-1.5"
    >
      <input
        checked={todo.isComplete}
        type="checkbox"
        onChange={() => {
          dispatchTodos({ type: "toggleCheckbox", payload: { todoId: todo.id } });
        }}
        className="w-6 h-6 m-0 "
      />
      <input
        ref={inputRef}
        className={`grow h-10 w-full ${todo.isComplete ? "line-through" : ""}`}
        value={todo.text}
        onChange={(e) =>
          dispatchTodos({
            type: "changeValue",
            payload: { todoId: todo.id, todoValue: e.target.value },
          })
        }
        type="text"
        disabled={!todo.isEdit}
      />
      <p className="whitespace-nowrap">{todo.createdAt.toLocaleString("fa-IR")}</p>
      <Button
        className="custom-btn flex justify-center items-center"
        onClick={() => {
          dispatchTodos({ type: "delete", payload: { todoId: todo.id } });
        }}
      >
        <MdDelete size={25} />
      </Button>
      <Button
        className="custom-btn flex justify-center items-center"
        onClick={() => {
          dispatchTodos({ type: "todoIsEditable", payload: { todoId: todo.id } });
        }}
      >
        {todo.isEdit ? <MdDone size={23} /> : <MdModeEditOutline size={23} />}
      </Button>
    </li>
  );
}

function TodoFilter({
  defaultValue,
  onChangeValue,
}: {
  defaultValue: string;
  onChangeValue: (value: "default" | "complete" | "inProgress") => void;
}) {
  return (
    <div className="flex gap-2.5 px-3">
      <p>Filter</p>
      <select
        className="bg-white rounded"
        defaultValue={defaultValue}
        onChange={(e) => onChangeValue(e.target.value as "default" | "complete" | "inProgress")}
      >
        <option value="default">All Todos</option>
        <option value="complete">Complete</option>
        <option value="inProgress">In Progress</option>
      </select>
    </div>
  );
}

function FilterBySort({
  defaultValue,
  onchangeSort,
}: {
  defaultValue: string;
  onchangeSort: (value: "alphabet" | "date" | "none") => void;
}) {
  return (
    <div className="flex gap-3 px-3">
      <label>Sort</label>
      <select
        className="bg-white rounded"
        defaultValue={defaultValue}
        onChange={(e) => onchangeSort(e.target.value as "alphabet" | "date" | "none")}
      >
        <option value="date">Date</option>
        <option value="alphabet">Alphabet</option>
      </select>
    </div>
  );
}

function Button({
  className,
  onClick,
  children,
}: {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
