import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // Import the CSS file

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        { name, email, password, mobile, address }
      );
      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1200 });
        navigate("/login");
      } else {
        toast.error(response.data.message, { autoClose: 1200 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { autoClose: 1200 });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h3 className="text-center">Sign Up</h3>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Fullname
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="fullname"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={checked ? "password" : "text"}
              className="form-control"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="form-control"
              id="mobile"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              onChange={handleCheckbox}
              type="checkbox"
              className="form-check-input"
              id="showPassword"
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show password
            </label>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
