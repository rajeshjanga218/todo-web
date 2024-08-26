import React, { useState } from "react";
import { loginUser } from "../authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const { error, loading } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "please enter email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "please enter valid email";
    }

    if (!formData.password.trim()) {
      errors.password = "please enter password";
    }

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setFormError(validateErrors);
      return;
    }
    await dispatch(loginUser(formData));
    navigate("/user/user-profile");
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
          className={`border ${
            formError.email ? "border-red-500" : "border-gray-500"
          }  rounded-md focus:border focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200`}
        />
      </div>
      {formError.email && <p className="text-red-500">{formError.email}</p>}
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
          className={`border ${
            formError.password ? "border-red-500" : "border-gray-500"
          } rounded-md focus:border focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200`}
        />
        {formError.password && (
          <p className="text-red-500">{formError.password}</p>
        )}
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

export default LoginForm;
