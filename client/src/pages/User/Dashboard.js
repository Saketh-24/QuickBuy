import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/Auth/AuthContext";

const Dashboard = () => {
  const [Auth] = useAuth();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <UserMenu />
        </div>
      </div>
      <div className="row">
        <div className="">
          {" "}
          {/* Adjust the offset to center the content */}
          <div className="dashboard-content p-5">
            {/* Welcome Greeting */}
            <div className="welcome-section text-center mb-5">
              <h1 className="display-4">Welcome, {Auth.user.name}!</h1>
              <p className="lead">We are glad to have you here.</p>
              <p>
                Explore your dashboard and manage your account. Let’s get
                started!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
