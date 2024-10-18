import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div class="shadow-lg p-3 bg-body-tertiary rounded">
        <div className="text-center admin-menu">
          <div className="d-flex justify-content-evenly">
            <NavLink
              to="/dashboard/User/Profile"
              className="list-group-item list-group-item-action flex-fill"
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/User/Orders"
              className="list-group-item list-group-item-action flex-fill"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
