import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import "./Login.css"; // Create a CSS file for custom styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const [Auth, setAuth] = useAuth();

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1200 });
        setAuth({
          ...Auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        navigate(cartItems?.length > 0 ? "/cart" : "/");
      } else {
        toast.error(response.data.message, { autoClose: 1200 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { autoClose: 1200 });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="text-center">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={checked ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              onChange={handleCheckbox}
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={checked}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
          <div className="text-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="signup-link">
              {" "}
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
