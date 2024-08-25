import { TOGGLE_DARK_MODE } from "./action";

const initialState = {
  isDarkMode: false,
};
const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
  }
  return state;
};

export default darkModeReducer;
