import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../utils";
import { logoutUser } from "../action";

const whitelistedRoutes = [
  "/user/login",
  "/user/signup",
  "/posts",
  "/posts/:id",
  "/todos",
  "/",
  "/debo",
  "/scroll",
  "/newscroll",
  "/modalparent",
  "/materialuidrawer",
  "/headlesuidrawer",
];

function AuthComponent({ children }) {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const path = location.pathname;

  useEffect(() => {
    const token = getCookie("token");
    if (!whitelistedRoutes.includes(path) && (!user || !token)) {
      setIsAuthenticated(false);
      logoutUser();
      navigate("/user/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [user, navigate, location, path]);

  if (!isAuthenticated) return null;

  return <div>{children}</div>;
}

export default AuthComponent;
