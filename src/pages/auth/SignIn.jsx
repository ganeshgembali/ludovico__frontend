import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  const { login, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      await login(formData);

      // Login successful → Enable Location
      navigate("/enable-location");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to sign in. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      await loginWithGoogle(credentialResponse.credential);

      // Google authentication successful → Enable Location
      navigate("/enable-location");
    } catch (error) {
      console.log(error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signin-page">
      <div className="signin-container">
        {/* Logo */}
        <header className="signin-header">
          <div className="signin-logo">
            <img
              src="/ludovico-logo.jpeg"
              alt="Ludovico logo"
              className="signin-logo-mark"
            />

            <div className="signin-logo-text">
              <h1>LUDOVICO</h1>
              <span>COFFEE</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="signin-content">
          <h2>Welcome back</h2>

          <p className="signin-subtitle">
            Sign in to continue your Ludovico coffee experience.
          </p>

          {error && <p className="signin-error">{error}</p>}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="signin-form">
            {/* Email */}
            <div className="form-group">
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} strokeWidth={1.5} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="input-wrapper">
                <LockKeyhole
                  className="input-icon"
                  size={18}
                  strokeWidth={1.5}
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            {/* Sign In */}
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* OR */}
            <div className="signin-divider">
              <span>OR</span>
            </div>

            {/* Google */}
            <div className="google-login">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() =>
                  setError("Google sign-in failed. Please try again.")
                }
                text="continue_with"
                shape="rectangular"
                theme="outline"
                size="large"
                width="100%"
              />
            </div>
          </form>

          {/* Register */}
          <p className="register-link">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
