import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [Auth, setAuth] = useAuth();

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
        navigate("/");
      } else {
        toast.error(response.data.message, { autoClose: 1200 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong", { autoClose: 1200 });
    }
  };

  return (
    <div className="LoginPage">
      <form onSubmit={handleLogin}>
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
            aria-describedby="emailHelp"
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            show password
          </label>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
        <div className="text-center">
          <span>Don't have an account?</span>
          <div className="d-inline" style={{ marginLeft: "0.5rem" }}>
            <Link to="/register">SignUp</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
