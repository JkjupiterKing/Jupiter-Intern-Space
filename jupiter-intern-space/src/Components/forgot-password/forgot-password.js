import React, { useState } from "react";
import axios from "axios";
import "./forgot-password.css";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("email", email);

      const res = await axios.post("http://localhost:8080/otp/send", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setMessage(res.data.message || "OTP sent to your email-Id!");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("otp", otp);

      const res = await axios.post("http://localhost:8080/otp/verify", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setMessage(res.data.message || "OTP verified!");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.error || "OTP verification failed");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("newPassword", newPassword);

      const res = await axios.put(
        "http://localhost:8080/users/reset-password",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setMessage(res.data.message || "Password reset successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Password reset failed");
    }
    setLoading(false);
  };

  return (
    <div
      className="modal fade"
      id="forgotPasswordModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Password</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* Step 1: Enter Email */}
            {step === 1 && (
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleSendOTP}
                  disabled={loading}
                  id="send-otp-btn"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <div>
                <label>Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="btn btn-success mt-3"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}

            {/* Step 3: Enter New Password */}
            {step === 3 && (
              <div>
                <label>New Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-warning mt-3"
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Reset Password"}
                </button>
              </div>
            )}

            {/* Message */}
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
