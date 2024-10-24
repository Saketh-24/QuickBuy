import React, { useEffect, useState } from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [Auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setchecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, mobile, address } = Auth.user;
    setName(name);
    setEmail(email);
    setMobile(mobile);
    setAddress(address);
  }, [Auth?.user]);

  const handleCheckbox = () => {
    if (checked) setchecked(false);
    else setchecked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/updateProfile`,
        { name, email, password, mobile, address },
        { headers: { Authorization: `Bearer ${Auth.token}` } }
      );
      if (response.data.success) {
        setAuth({ ...Auth, user: response.data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = response.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(response.data.message, { autoClose: 1200 });
      } else {
        toast.error(response.data.message, { autoClose: 1200 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { autoClose: 1200 });
    }
  };

  return (
    <div className="container-fluid">
      {Auth.user?.role === "admin" ? (
        <></>
      ) : (
        <div className="row">
          <div className="flex">
            <UserMenu />
          </div>
        </div>
      )}
      <div className="SignUpPage">
        <form onSubmit={handleSubmit}>
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
              disabled
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
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
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
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              show password
            </label>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
