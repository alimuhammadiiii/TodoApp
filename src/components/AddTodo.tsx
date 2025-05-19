import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useTodosDispatch } from "../hooks/useTodoContext";
export default function AddTodo() {
  const [text, setText] = useState("");
  const todoDispatch = useTodosDispatch();

  return (
    <div className="bg-white/30 backdrop-blur-md flex gap-3 rounded min-h-[45px] absolute bottom-3 left-3 right-3">
      <button
        onClick={() => {
          if (text.trim() === "") {
            return alert("please write todo");
          }
          todoDispatch({ type: "add", payload: { text: text } });
          setText("");
        }}
        className="bg-inherit add-bottom cursor-pointer h-11 w-10 flex justify-center items-center"
      >
        <IoMdAdd size={20} />
      </button>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="grow outline-none text-black placeholder:text-black h-11"
      />
    </div>
  );
}
