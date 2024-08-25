import { getCookie, setCookie } from "./utils";

// action types
export const LOGOUT_USER = "LOGOUT_USER";

export const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const GET_TODOS = "GET_TODOS";
export const GET_TODO = "GET_TODO";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "ADD_TODO";
export const DELETE_TOD = "DELETE_TODO";

export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const FETCH_POST_REQUEST = "FETCH_POST_REQUEST";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";

export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

// action creaters
export function logoutUser() {
  return { type: LOGOUT_USER };
}

export function signupUserRequest() {
  return { type: SIGNUP_USER_REQUEST };
}

export function signupUserSuccess(data) {
  return { type: SIGNUP_USER_SUCCESS, payload: data };
}

export function signupUserFailure(error) {
  return { type: SIGNUP_USER_FAILURE, payload: error };
}

export function loginUserRequest() {
  return { type: LOGIN_USER_REQUEST };
}

export function loginUserSuccess(data) {
  return { type: LOGIN_USER_SUCCESS, payload: data };
}

export function loginUserFailure(error) {
  return { type: LOGIN_USER_FAILURE, payload: error };
}

export function fetchUSersRequest() {
  return { type: FETCH_USERS_REQUEST };
}

export function fetchUSersSuccess(data) {
  return { type: FETCH_USERS_SUCCESS, payload: data };
}

export function fetchUSersFailure(error) {
  return { type: FETCH_USERS_FAILURE, payload: error };
}

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

export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE };
}

export function signupUser(userData) {
  return async (dispatch) => {
    try {
      dispatch(signupUserRequest());

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch("http://localhost:4000/signup", options);
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          errorMessage.message || `HTTP erro! status: ${response.status}`
        );
      }
      const data = await response.json();
      dispatch(signupUserSuccess(data));
    } catch (error) {
      dispatch(signupUserFailure(error.message));
    }
  };
}

export function loginUser(data) {
  return async (dispatch) => {
    try {
      dispatch(loginUserRequest());
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch("http://localhost:4000/login", options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const resData = await response.json();
      setCookie("token", `${resData.token}`, 1);
      dispatch(loginUserSuccess(resData));
    } catch (error) {
      const errorMessage =
        error.message === "user not found"
          ? "Please email was not registered please signup"
          : error.message;
      dispatch(loginUserFailure(errorMessage));
    }
  };
}

export function fetchUsers() {
  return async (dispatch) => {
    try {
      dispatch(fetchUSersRequest());
      const token = getCookie("token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const response = await fetch("http://localhost:4000/users", options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      dispatch(fetchUSersSuccess(data));
    } catch (error) {
      dispatch(fetchUSersFailure(error.message));
    }
  };
}

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
