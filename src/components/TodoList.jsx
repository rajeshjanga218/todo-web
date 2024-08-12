import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TodoList() {
  const todos = useSelector((store) => store.todoState.todos);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");

  const handleAddTod = () => {
    dispatch({
      type: "ADD_TODO",
      payLoad: {
        title: userInput,
        discription: userInput + " " + "description",
      },
    });
  };
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="input"
        />
        <button type="button" onClick={handleAddTod}>
          add todo
        </button>
      </div>
      <ul>
        {todos && todos.length ? (
          todos.map((todo, index) => <li key={index}>{todo.title}</li>)
        ) : (
          <p>No items</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
