import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./css/login.css"; 

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    // **Basic Validation**
    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = "http://localhost:8081/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);

        // **Navigate to Home immediately after login**
        navigate("/home");
      } else {
        const errorMessage =
          error?.details?.[0]?.message || message || "An error occurred";
        handleError(errorMessage);
      }
    } catch (err) {
      handleError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h1>FlashCard Application</h1>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              required
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}

export default Login;
