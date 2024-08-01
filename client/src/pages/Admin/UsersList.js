import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth/AuthContext";

const UsersList = () => {
  const [Users, setUsers] = useState([]);
  const [Auth] = useAuth();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/admin/UsersList",
          {
            headers: {
              Authorization: `Bearer ${Auth.token}`, // Include token in headers
            },
          }
        );
        if (result.data) {
          console.log(result.data);
          setUsers(result.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [Auth.token]); // get all the users

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="flex">
          <AdminMenu />
        </div>
      </div>
      <div className="container-fluid user-container m-auto">
        <ul className="d-flex list-group list-group-horizontal-md">
          <li className="flex-grow-1 detail text-center list-group-item">
            Name
          </li>
          <li className="flex-grow-1 detail text-center list-group-item">
            Email
          </li>
          <li className="flex-grow-1 detail text-center list-group-item">
            Mobile
          </li>
        </ul>
        {Users.map((user) => (
          <ul
            className="d-flex list-group list-group-horizontal-md"
            key={user._id}
          >
            <li className="flex-grow-1 detail text-center list-group-item">
              {user.name}
            </li>
            <li className="flex-grow-1 detail text-center list-group-item">
              {user.email}
            </li>
            <li className="flex-grow-1 detail text-center list-group-item">
              {user.mobile}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
