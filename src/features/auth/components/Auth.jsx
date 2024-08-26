import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { getBasePath, getCookie } from "../../../utils";
import { logoutUser } from "../authActions";
import { whitelistedRoutes } from "../../../constants/routes";

function Auth({ children }) {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // Initialize dispatch
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const fullPath = location.pathname;
  // const basePath = getBasePath(fullPath);
  // console.log(basePath);

  useEffect(() => {
    const token = getCookie("token");

    // if (!whitelistedRoutes.includes(fullPath) && (!user || !token)) {
    if (!whitelistedRoutes.includes(fullPath) && !token) {
      setIsAuthenticated(false);
      dispatch(logoutUser()); // Use dispatch for logout action
      navigate("/user/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [user, navigate, location, fullPath, dispatch]); // Added dispatch to dependencies

  if (!isAuthenticated) return null;

  return <div>{children}</div>;
}

export default Auth;
