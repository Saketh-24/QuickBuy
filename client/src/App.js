import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoute from "./Route/PrivateRoute";
import Dashboard from "./pages/User/Dashboard";
import AdminRoute from "./Route/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="User" element={<Dashboard />} />
        </Route>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
