import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import "./VerifyEmail.css";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyUserEmail, resendVerificationOtp } = useAuth();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  /* -------------------------
     Countdown
  ------------------------- */

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* -------------------------
     OTP input
  ------------------------- */

  const handleOtpChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";

      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = cleanValue[cleanValue.length - 1];

    setOtp(updatedOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* -------------------------
     Keyboard handling
  ------------------------- */

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* -------------------------
     Paste OTP
  ------------------------- */

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) {
      return;
    }

    const updatedOtp = Array(OTP_LENGTH).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const focusIndex = Math.min(pastedValue.length, OTP_LENGTH - 1);

    inputRefs.current[focusIndex]?.focus();
  };

  /* -------------------------
     Verify OTP
  ------------------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!email) {
      setError("Email address is missing. Please register again.");
      return;
    }

    try {
      setLoading(true);

      await verifyUserEmail({
        email,
        otp: otpValue,
      });

      navigate("/welcome");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid verification code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     Resend OTP
  ------------------------- */

  const handleResend = async () => {
    if (timeLeft > 0 || !email) {
      return;
    }

    try {
      setResending(true);
      setError("");

      await resendVerificationOtp({
        email,
        purpose: "verify_email",
      });

      setOtp(Array(OTP_LENGTH).fill(""));
      setTimeLeft(RESEND_TIME);

      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend the code. Please try again.",
      );
    } finally {
      setResending(false);
    }
  };

  /* -------------------------
     Email display
  ------------------------- */

  const getMaskedEmail = () => {
    if (!email) {
      return "";
    }

    const [username, domain] = email.split("@");

    if (!username || !domain) {
      return email;
    }

    if (username.length <= 2) {
      return `${username[0]}***@${domain}`;
    }

    return `${username.slice(0, 2)}***@${domain}`;
  };

  return (
    <main className="verify-page">
      <div className="verify-container">
        {/* Header */}

        <header className="verify-header">
          <button
            type="button"
            className="verify-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={21} strokeWidth={1.7} />
          </button>

          <div className="verify-logo">
            <img
              src="/ludovico-logo.jpeg"
              alt="Ludovico logo"
              className="verify-logo-mark"
            />

            <div className="verify-logo-text">
              <h1>LUDOVICO</h1>
              <span>COFFEE</span>
            </div>
          </div>
        </header>

        {/* Content */}

        <section className="verify-content">
          <h2>Verify your email</h2>

          <p className="verify-description">
            We've sent a 6-digit verification code to
          </p>

          <p className="verify-email">{getMaskedEmail()}</p>

          {error && <p className="verify-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* OTP */}

            <div className="otp-container" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  className={`otp-input ${digit ? "filled" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Resend */}

            <div className="resend-container">
              {timeLeft > 0 ? (
                <p>
                  Didn't receive the code? <span>Resend in {timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="resend-button"
                >
                  {resending ? "Sending..." : "Resend code"}
                </button>
              )}
            </div>

            {/* Continue */}

            <button type="submit" className="verify-button" disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </button>
          </form>

          {/* Support */}

          <p className="support-link">
            Need help? <Link to="/support">Contact Support</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default VerifyEmail;
