// utils/cookies.js
export const setCookie = (name, value, hours) => {
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export function getBasePath(path) {
  const segments = path.split("/");

  // Check if the last segment is an ID (assumes IDs are numeric or alphanumeric)
  if (segments.length > 1 && segments[segments.length - 1].match(/^\w+$/)) {
    segments.pop(); // Remove the last segment
  }

  return segments.join("/");
}

const apiFetch = async (url, { method = "GET", body = null }) => {
  const token = getCookie("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`http://localhost:4000${url}`, options);

  if (!response.ok) {
    const errorData = await response.json();
    if (
      response.status === 401 ||
      errorData.message === "auth header is required"
    ) {
      // Handle unauthorized error
      // dispatch(logoutUser());
      window.localStorage.clear();
      window.location.reload();
      throw new Error("Unauthorized");
    }
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data;
};
