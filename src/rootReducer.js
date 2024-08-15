import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  todoState: todoReducer,
  postState: postReducer,
  userState: authReducer,
});

export default rootReducer;
