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
import AddCatrgory from "./pages/Admin/AddCategory";
import AddProduct from "./pages/Admin/AddProduct";
import UsersList from "./pages/Admin/UsersList";
import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";
import DetailsPage from "./pages/DetailsPage";
import CartDetails from "./pages/CartDetails";
import AdminOrders from "./pages/Admin/AdminOrders";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* admin routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/addCategory" element={<AddCatrgory />} />
          <Route path="admin/addProduct" element={<AddProduct />} />
          <Route path="admin/Users" element={<UsersList />} />
          <Route path="admin/Orders" element={<AdminOrders />} />
        </Route>

        {/* user routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="User" element={<Dashboard />} />
          <Route path="User/Profile" element={<Profile />} />
          <Route path="User/Orders" element={<Orders />} />
        </Route>

        <Route exact path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
