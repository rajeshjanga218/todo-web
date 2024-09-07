import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo, deleteTodo, updateTodo } from "../todoActions";

function TodoList() {
  const todos = useSelector((store) => store.todoState.todos);
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const lastItemId = todos.length > 0 ? todos[todos.length - 1].id : 1;
    const newTodo = {
      ...userInput,
      id: lastItemId + 1,
    };
    dispatch(AddTodo(newTodo));
    setUserInput({
      title: "",
      description: "",
      isCompleted: false,
    });
  };

  const handleTodoDetails = () => {};

  const handleEditTodo = () => {
    // dispatch(updateTodo(newTodo));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          name="title"
          type="text"
          value={userInput.title}
          onChange={onChangeInput}
          placeholder="enter title..."
          className="border border-gray-400 rounded"
        />
        <input
          name="description"
          type="text"
          value={userInput.description}
          onChange={onChangeInput}
          placeholder="enter title..."
          className="border border-gray-400 rounded"
        />

        <button type="submit" className="p-1 border">
          add todo
        </button>
      </form>
      <ul>
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <li key={todo.id} className="p-2 bg-slate-400 flex justify-between">
              <div>
                <p>
                  <span>{index + 1}. </span>
                  {todo.title}
                </p>
                <p>{todo.description}</p>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={handleTodoDetails}>
                  details
                </button>
                <button type="button" onClick={handleEditTodo}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                  delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No items</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
