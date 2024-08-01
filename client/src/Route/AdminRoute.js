import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [Auth] = useAuth(); // Destructure Auth from useAuth

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/admin-auth",
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

export default AdminRoute;
