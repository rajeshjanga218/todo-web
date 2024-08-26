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
} from "../../constants/actionTypes";

// fetch posts
export function fetchPostsRequest() {
  return { type: FETCH_POSTS_REQUEST };
}

export function fetchPostsSuccess(data) {
  return { type: FETCH_POSTS_SUCCESS, payload: data };
}

export function fetchPostsFailure(error) {
  return { type: FETCH_POSTS_FAILURE, payload: error };
}

// add post

export function addPostRequest() {
  return { type: ADD_POST_REQUEST };
}

export function addPostSuccess(data) {
  return { type: ADD_POST_SUCCESS, payload: data };
}

export function addPostFailure(error) {
  return { type: ADD_POST_FAILURE, payload: error };
}

// delete post

export function deletePostRequest() {
  return { type: DELETE_POST_REQUEST };
}

export function deletePostSuccess(data) {
  return { type: DELETE_POST_SUCCESS, payload: data };
}

export function deletePostFailure(error) {
  return { type: DELETE_POST_FAILURE, payload: error };
}

// fetch post byt id

export function fetchPostRequest() {
  return {
    type: FETCH_POST_REQUEST,
  };
}

export function fetchPostSuccess(data) {
  return {
    type: FETCH_POST_SUCCESS,
    payload: data,
  };
}

export function fetchPostFailure(error) {
  return {
    type: FETCH_POST_FAILURE,
    payload: error,
  };
}

// functions
export function fetchPost(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchPostRequest());
      const response = await fetch(`http://localhost:4000/post/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(fetchPostSuccess(data));
    } catch (error) {
      dispatch(fetchPostFailure(error.message));
    }
  };
}
