import React from "react";
import { useAuth } from "../context/Auth/AuthContext";

const HomePage = () => {
  const [Auth] = useAuth();

  return (
    <div>
      HomePage
      <div>{JSON.stringify(Auth)}</div>
    </div>
  );
};

export default HomePage;
