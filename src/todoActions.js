import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from "./constants/actionTypes";

export function getTodos(data) {
  return { type: GET_TODOS, payload: data };
}

export function getTodo(data) {
  return { type: GET_TODO, payload: data };
}

export function AddTodo(data) {
  return { type: ADD_TODO, payload: data };
}

export function updateTodo(data) {
  return { type: UPDATE_TODO, payload: data };
}

export function deleteTodo(data) {
  return { type: DELETE_TODO, payload: data };
}
