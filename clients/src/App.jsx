import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import Unauthorized from "./pages/Unauthorized";
import User from "./pages/Admin/User";
import Profile from "./pages/Admin/Profile";
import Product from "./pages/Admin/Product/Product";
import Products from "./pages/Dashboard/Products";
import About from "./pages/Dashboard/About";
import AHome from "./pages/Admin/AHome";
import DHome from "./pages/Dashboard/DHome";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<DHome />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path="Ahome" element={<AHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user" element={<User />} />
          <Route path="product" element={<Product />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
