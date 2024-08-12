const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  if (action.type === "ADD_TODO") {
    return { ...state, todos: [...state.todos, action.payLoad] };
  }
  return state;
};

export default todoReducer;
