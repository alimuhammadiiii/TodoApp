import { useRef, type ReactNode } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useTodos, useTodosDispatch } from "../hooks/useTodoContext";
// import { Route as Home } from "../routes/index";
import { MdDone } from "react-icons/md";
import type { Todo } from "../hooks/useTodoContext";

export default function Todos() {
  const todos = useTodos();
  // const search = Home.useSearch();
  // const filteredTodos = todos.filter((todo) => {
  //   return todo.text.includes(search.todoSearch ?? "");
  // });

  return (
    <ul className="grow overflow-y-auto flex flex-col gap-2">
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
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
