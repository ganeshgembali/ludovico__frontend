import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

import SignIn from "../pages/auth/SignIn";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import EnableLocation from "../pages/auth/EnableLocation";
import Welcome from "../pages/auth/Welcome";
import AppPreview from "../pages/preview/AppPreview";
import Home from "../pages/home/Home";
import Account from "../pages/account/Account";

const ForgotPassword = () => <div>Forgot Password</div>;
const ResetPassword = () => <div>Reset Password</div>;

const Products = () => <div>Products</div>;
const ProductDetails = () => <div>Product Details</div>;

const Offers = () => <div>Offers</div>;
const Orders = () => <div>Orders</div>;
const Rewards = () => <div>Rewards</div>;
const Location = () => <div>Location</div>;
const Support = () => <div>Contact Support</div>;
const Categories = () => <div>Categories</div>;

const EntryRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const location = localStorage.getItem("userLocation");

  if (location) {
    return <Navigate to="/app-preview" replace />;
  }

  return <Navigate to="/enable-location" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Public authentication pages */}
    <Route path="/signin" element={<SignIn />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    {/* Protected application flow */}
    <Route element={<ProtectedRoute />}>
      <Route path="/enable-location" element={<EnableLocation />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/app-preview" element={<AppPreview />} />

      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/support" element={<Support />} />
      <Route path="/account" element={<Account />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/location" element={<Location />} />
    </Route>

    {/* Website entry */}
    <Route path="/" element={<EntryRedirect />} />

    {/* Unknown routes */}
    <Route path="*" element={<EntryRedirect />} />
  </Routes>
);

export default AppRoutes;
