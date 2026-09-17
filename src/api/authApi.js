import api from "./client";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const verifyEmail = (data) => {
  return api.post("/auth/verify-email", data);
};

export const resendOtp = (data) => {
  return api.post("/auth/resend-otp", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const googleLogin = (credential) => {
  return api.post("/auth/google", { credential });
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};