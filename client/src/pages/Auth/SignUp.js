import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        { name, email, password, mobile }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong");
    }
  };

  return (
    <div className="SignUpPage">
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
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            mobile
          </label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="number"
            className="form-control"
            id="mobile"
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
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
