import { useDispatch } from "react-redux";

function useFetchApi() {
  const dispatch = useDispatch();

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
        dispatch(logoutUser());
        window.localStorage.clear();
        window.location.reload();
        throw new Error("Unauthorized");
      }
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  };

  return apiFetch;
}

export default useFetchApi;
