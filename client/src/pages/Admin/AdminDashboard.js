import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/Auth/AuthContext";

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
          <h1>Admin Details</h1>
          <div className="p-2 d-flex flex-column justify-content-center align-items-start">
            <h3>Admin Name: {Auth.user.name}</h3>
            <h3>Admin Email: {Auth.user.email}</h3>
            <h3>Admin Mobile: {Auth.user.mobile}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
