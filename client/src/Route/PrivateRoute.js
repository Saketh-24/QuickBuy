import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import Spinner from "../components/Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [Auth] = useAuth(); // Destructure Auth from useAuth

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/user-auth",
          {
            headers: {
              Authorization: `Bearer ${Auth.token}`, // Include token in headers
            },
          }
        );

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error);
        setOk(false);
      }
    };

    // Check token presence
    if (Auth.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [Auth.token]); // Dependency on Auth.token

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
