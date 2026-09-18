import { useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  verifyEmail,
  resendOtp,
  googleLogin,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from "../api/authApi";

import {
  mockRegister,
  mockVerifyEmail,
  mockResendOtp,
  mockCurrentUser,
} from "../mock/authMock";

import { AuthContext } from "./AuthContextDefinition";

const USE_MOCK_AUTH = true;

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = USE_MOCK_AUTH
          ? await mockCurrentUser()
          : await getCurrentUser();
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (data) => {
    const response = await loginUser(data);

    const token = response.data.data.token;

    localStorage.setItem("token", token);
    setUser(response.data.data.user);

    return response;
  };

  const register = async (data) => {
    if (USE_MOCK_AUTH) {
      return await mockRegister(data);
    }

    return await registerUser(data);
  };

  const verifyUserEmail = async (data) => {
    const response = USE_MOCK_AUTH
      ? await mockVerifyEmail(data)
      : await verifyEmail(data);

    const token = response.data.data.token;

    localStorage.setItem("token", token);
    setUser(response.data.data.user);

    return response;
  };

  const resendVerificationOtp = async (data) => {
    if (USE_MOCK_AUTH) {
      return await mockResendOtp(data);
    }

    return await resendOtp(data);
  };

  const loginWithGoogle = async (credential) => {
    const response = await googleLogin(credential);

    const token = response.data.data.token;

    localStorage.setItem("token", token);
    setUser(response.data.data.user);

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const startForgotPassword = async (data) => {
    return await forgotPassword(data);
  };

  const resetUserPassword = async (data) => {
    return await resetPassword(data);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,

    login,
    register,
    verifyUserEmail,
    resendVerificationOtp,
    loginWithGoogle,
    logout,
    startForgotPassword,
    resetUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
