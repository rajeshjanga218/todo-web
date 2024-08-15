import React, { useState } from "react";
import { signupUser } from "../action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Signup() {
  const { error, loading, user } = useSelector((state) => state.userState);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="firstName" className="block">
          first name:
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleOnChange}
          className="border border-gray-500 rounded-md focus:border focus:outline-none
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block">
          lastName:
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleOnChange}
          className="border border-gray-500 rounded-md focus:border focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200"
        />
      </div>
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
      <Link to={"/user/login"}>
        <p>Login</p>
      </Link>
      <button type="submit" className="border border-gray-600 rounded-md mt-2">
        submit
      </button>
      {loading && <p>Loading...</p>}
      {user && <p>user registered successfully! please login.</p>}

      {error && <p>{error}</p>}
    </form>
  );
}

export default Signup;
