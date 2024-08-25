import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import { postReducer } from "./features/posts";
import darkModeReducer from "./darkModeReducer";

const rootReducer = combineReducers({
  todoState: todoReducer,
  postState: postReducer,
  userState: authReducer,
  darkModeState: darkModeReducer,
});

export default rootReducer;
