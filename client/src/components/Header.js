import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/Auth/AuthContext";

const Header = () => {
  const [Auth, setAuth] = useAuth();

  // function to remove the user details from localstorage once they click on logout
  const handleAuth = () => {
    setAuth({ ...Auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("logout successfull", {
      autoClose: 2000, // Duration in milliseconds
    });
  };

  return (
    <div>
      <ToastContainer />
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              Quick BUY
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <GoHomeFill />
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link">
                  Categories
                </NavLink>
              </li>
              {Auth.user ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {Auth.user.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${Auth.user.role}`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleAuth}
                        to="/login"
                        className="dropdown-item"
                      >
                        <FiLogIn /> Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    <FiLogIn /> Login
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <MdOutlineShoppingCart /> Cart<span>(0)</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
