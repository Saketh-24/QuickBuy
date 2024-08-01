import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoute from "./Route/PrivateRoute";
import Dashboard from "./pages/User/Dashboard";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
