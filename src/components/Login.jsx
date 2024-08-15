import React, { useState } from "react";
import { loginUser } from "../action";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { error, loading } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
    navigate("/user/dashboard");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="email" className="block">
          email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          className="border border-gray-500 rounded-md focus:border focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="password" className="block">
          password:
        </label>
        <input
          id="password"
          type="text"
          name="password"
          value={formData.password}
          onChange={handleOnChange}
          className="border border-gray-500 rounded-md focus:border focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200"
        />
      </div>
      <Link to={"/user/signup"}>
        <p>Signup</p>
      </Link>
      <button type="submit" className="border border-gray-600 rounded-md mt-2">
        submit
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
