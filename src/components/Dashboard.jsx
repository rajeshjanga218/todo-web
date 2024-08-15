import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, logoutUser } from "../action";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils";

function Dashboard() {
  const { user, users, error, loading } = useSelector(
    (state) => state.userState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(logoutUser());
    navigate("/user/login");
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, navigate]);

  return (
    <div>
      {user && <p>Dashboard {user.firstName}</p>}
      <button
        type="button"
        onClick={handleLogout}
        className="border rounded-md"
      >
        Logout
      </button>
      <h1>List of other users</h1>
      <ul>
        {users.length > 0 &&
          users.map((user, index) => <li key={index}>{user.email}</li>)}
        {error && <p>{error}</p>}
        {loading && <p>loading...</p>}
      </ul>
    </div>
  );
}

export default Dashboard;
