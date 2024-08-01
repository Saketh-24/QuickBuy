import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="text-center admin-menu">
          <div className="d-flex justify-content-evenly">
            <NavLink
              to="/dashboard/admin/addCategory"
              className="list-group-item list-group-item-action flex-fill"
            >
              Add Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/addProduct"
              className="list-group-item list-group-item-action flex-fill"
            >
              Add Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/Users"
              className="list-group-item list-group-item-action flex-fill"
            >
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
