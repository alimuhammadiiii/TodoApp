import { createContext, useContext, useReducer } from "react";

export type Todo = {
  text: string;
  id: string;
  isComplete: boolean;
  isEdit: boolean;
};

const TodosContext = createContext<Array<Todo>>(null!);
const TodosDispatchContext = createContext<React.Dispatch<TodoAction>>(null!);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={todosDispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const todos = useContext(TodosContext);
  if (todos === null) {
    throw new Error("Missing todos context");
  }
  return todos;
}

export function useTodosDispatch() {
  const todosDispatch = useContext(TodosDispatchContext);
  if (todosDispatch === null) {
    throw new Error("miss something");
  }
  return todosDispatch;
}

type TodoAddAction = { type: "add"; payload: { text: string } };
type TodoDeleteAction = { type: "delete"; payload: { todoId: string } };
type TodoChangeValue = { type: "changeValue"; payload: { todoId: string; todoValue: string } };
type TodoIsEditable = { type: "todoIsEditable"; payload: { todoId: string } };
type TodoToggleCheckbox = { type: "toggleCheckbox"; payload: { todoId: string } };

export type TodoAction =
  | TodoAddAction
  | TodoDeleteAction
  | TodoChangeValue
  | TodoIsEditable
  | TodoToggleCheckbox;

function todosReducer(todos: Array<Todo>, action: TodoAction) {
  switch (action.type) {
    case "add": {
      return [
        {
          text: action.payload.text,
          id: crypto.randomUUID(),
          isComplete: false,
          isEdit: false,
        },
        ...todos,
      ];
    }
    case "delete": {
      return todos.filter((t) => t.id !== action.payload.todoId);
    }

    case "changeValue": {
      return todos.map((t) => {
        return t.id === action.payload.todoId ? { ...t, text: action.payload.todoValue } : t;
      });
    }

    case "todoIsEditable": {
      return todos.map((t) => {
        return t.id === action.payload.todoId ? { ...t, isEdit: !t.isEdit } : t;
      });
    }

    case "toggleCheckbox": {
      return todos.map((t) => {
        return t.id === action.payload.todoId ? { ...t, isComplete: !t.isComplete } : t;
      });
    }
  }
}
