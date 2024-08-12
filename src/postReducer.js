import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from "./action";

const initialState = {
  loading: false,
  posts: [],
  post: null,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
        error: null,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case FETCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
