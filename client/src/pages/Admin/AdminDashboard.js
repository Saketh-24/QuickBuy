import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/Auth/AuthContext";
import Profile from "../User/Profile";

const AdminDashboard = () => {
  const [Auth] = useAuth();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="flex">
          <AdminMenu />
        </div>
      </div>
      <div className="row">
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
