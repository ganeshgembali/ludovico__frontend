import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SignIn from "../pages/auth/SignIn";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import EnableLocation from "../pages/auth/EnableLocation";
import Welcome from "../pages/auth/Welcome";
import Home from "../pages/home/Home";

const ForgotPassword = () => <div>Forgot Password</div>;
const ResetPassword = () => <div>Reset Password</div>;

const Products = () => <div>Products</div>;
const ProductDetails = () => <div>Product Details</div>;
const Account = () => <div>Account</div>;
const Offers = () => <div>Offers</div>;
const Orders = () => <div>Orders</div>;
const Rewards = () => <div>Rewards</div>;
const Location = () => <div>Location</div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/enable-location" element={<EnableLocation />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/location" element={<Location />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Unknown route */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default AppRoutes;
