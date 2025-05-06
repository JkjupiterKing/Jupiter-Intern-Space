import React, { useState } from "react";
import "./login.css";
import {
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser, FaKey } from "react-icons/fa";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage("OTP has been sent to your email.");
      setStep("otp");
      setLoading(false);
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (formData.otp === "123456") {
        setMessage("Login/Signup successful!");
      } else {
        setMessage("Invalid OTP. Try again.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="login-bg"
      style={{
        background: "url('/Background.png') no-repeat center center",
      }}
    >
      <div className="form-box shadow-lg">
        <ToggleButtonGroup
          type="radio"
          name="authType"
          value={activeTab}
          onChange={(val) => {
            setActiveTab(val);
            setStep("form");
            setMessage("");
          }}
          className="w-100 mb-3 tab-toggle"
        >
          <ToggleButton
            id="t1"
            variant={activeTab === "login" ? "gradient" : "outline-secondary"}
            value="login"
          >
            Login
          </ToggleButton>
          <ToggleButton
            id="t2"
            variant={activeTab === "signup" ? "gradient" : "outline-secondary"}
            value="signup"
          >
            Signup
          </ToggleButton>
        </ToggleButtonGroup>

        {message && (
          <Alert
            variant={message.includes("successful") ? "success" : "danger"}
          >
            {message}
          </Alert>
        )}

        {step === "form" ? (
          <Form onSubmit={handleFormSubmit}>
            {activeTab === "signup" && (
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaUser className="me-2" /> Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" /> Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>
                <FaLock className="me-2" /> Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-end mb-3">
              <a className="forgot-link">Forgot password?</a>
            </div>
            <Button
              type="submit"
              className="w-100 gradient-btn"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : activeTab === "login" ? (
                "Login"
              ) : (
                "Signup"
              )}
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleOtpSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaKey className="me-2" /> Enter OTP
              </Form.Label>
              <Form.Control
                type="text"
                name="otp"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 gradient-btn"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Login;
