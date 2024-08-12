import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  todoState: todoReducer,
  postState: postReducer,
});

export default rootReducer;
