import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
} from "../../constants/actionTypes";
import { getCookie, setCookie } from "../../utils";

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
