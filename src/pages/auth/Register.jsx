import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserRound, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const { register, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
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

    if (!termsAccepted) {
      setError("Please accept the terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      await register(formData);

      navigate("/verify-email", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create your account. Please try again.",
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

      navigate("/home");
    } catch (error) {
      console.log(error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        {/* Logo */}
        <header className="register-header">
          <div className="register-logo">
            <img
              src="/ludovico-logo.jpeg"
              alt="Ludovico logo"
              className="register-logo-mark"
            />

            <div className="register-logo-text">
              <h1>LUDOVICO</h1>
              <span>COFFEE</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="register-content">
          <h2>Create your account</h2>

          <p className="register-subtitle">
            Join Ludovico for a faster, smoother coffee experience.
          </p>

          {error && <p className="register-error">{error}</p>}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <div className="input-wrapper">
                <UserRound className="input-icon" size={18} strokeWidth={1.5} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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

            {/* OR */}
            <div className="register-divider">
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

            {/* Terms */}
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />

              <span>
                I agree to the <a href="#terms">Terms of Service</a> and{" "}
                <a href="#privacy">Privacy Policy</a>.
              </span>
            </label>

            {/* Create Account */}
            <button
              type="submit"
              className="create-account-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In */}
          <p className="signin-link">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Register;
