import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/Auth/AuthContext";

const Dashboard = () => {
  const [Auth] = useAuth();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="flex">
          <UserMenu />
        </div>
      </div>
      <div className="row">
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
          <h1>User Details</h1>
          <div className="p-2 d-flex flex-column justify-content-center align-items-start">
            <h3>User Name: {Auth.user.name}</h3>
            <h3>User Email: {Auth.user.email}</h3>
            <h3>User Mobile: {Auth.user.mobile}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
