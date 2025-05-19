import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../forgot-password/forgot-password";
import {
  Form,
  Button,
  Alert,
  Spinner,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullName: "",
    phoneNumber: "",
    collegeName: "",
    degree: "",
    department: "",
    yearOfStudy: "",
    internshipDomain: "",
    preferredMode: "",
    documents: null,
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (activeTab === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setSignupData({ ...signupData, [name]: files ? files[0] : value });
    }
  };

  const sendOtp = async () => {
    try {
      const params = new URLSearchParams();
      params.append("email", signupData.email);

      const response = await fetch("http://localhost:8080/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const text = await response.text();
      if (response.ok) {
        setShowOtpField(true);
        setMessage("OTP sent to your email.");
      } else {
        setMessage(text || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Error sending OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const params = new URLSearchParams();
      params.append("email", signupData.email);
      params.append("otp", otp);

      const response = await fetch("http://localhost:8080/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const text = await response.text();
      if (text.toLowerCase().includes("success")) {
        setVerifiedOtp(true);
        setMessage("OTP verified! Completing signup...");
        await submitSignup();
      } else {
        setMessage("Invalid or expired OTP.");
      }
    } catch (error) {
      setMessage("Error verifying OTP.");
    }
  };

  const submitSignup = async () => {
    try {
      const payload = { ...signupData };
      delete payload.document; // assuming backend does not need file uploads now

      const response = await fetch("http://localhost:8080/users/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Signup successful! Please login.");
        setActiveTab("login");
        setShowOtpField(false);
        setOtp("");
        setVerifiedOtp(false);
      } else {
        setMessage(result.message || "Signup failed.");
      }
    } catch (error) {
      setMessage("Signup error.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (activeTab === "login") {
      try {
        const response = await fetch(
          `http://localhost:8080/users/email/${loginData.email}`
        );

        if (!response.ok) {
          setMessage("User not found.");
        } else {
          const user = await response.json();

          // Base64 decode the password from response
          const decodedPassword = atob(user.password);

          if (decodedPassword === loginData.password) {
            setMessage("Login successful!");

            // Save user to localStorage (excluding password)
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));

            navigate("/college-management");
          } else {
            setMessage("Incorrect password.");
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        setMessage("Login error.");
      }
    } else {
      if (!showOtpField) {
        await sendOtp();
      } else if (!verifiedOtp) {
        await verifyOtp();
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="login-bg"
      style={{ backgroundColor: "#DDDDDD", backgroundAttachment: "fixed" }}
    >
      <div
        className={`form-box ${activeTab === "signup" ? "signup-mode" : ""}`}
      >
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" style={{ height: "50px" }} />
          <h4 className="mb-0" style={{ color: "black" }}>
            Jupiter Intern Space
          </h4>
        </div>

        <ToggleButtonGroup
          type="radio"
          name="authType"
          value={activeTab}
          onChange={(val) => {
            setActiveTab(val);
            setMessage("");
            setShowOtpField(false);
            setOtp("");
            setVerifiedOtp(false);
          }}
          className="w-100 mb-3 tab-toggle"
        >
          <ToggleButton
            id="t1"
            variant="outline-secondary"
            value="login"
            style={{ color: "black" }}
          >
            Login
          </ToggleButton>
          <ToggleButton
            id="t2"
            variant="outline-secondary"
            value="signup"
            style={{ color: "black" }}
          >
            Signup
          </ToggleButton>
        </ToggleButtonGroup>

        {message && (
          <Alert
            variant={
              message.toLowerCase().includes("success") ? "success" : "danger"
            }
          >
            {message}
          </Alert>
        )}

        <Form onSubmit={handleFormSubmit}>
          {activeTab === "signup" && (
            <>
              {/* Signup Fields */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    <FaUser className="me-2" /> Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={signupData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    <FaPhone className="me-2" /> Phone Number
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={signupData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>College Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="collegeName"
                    value={signupData.collegeName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    name="degree"
                    value={signupData.degree}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={signupData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Year of Study</Form.Label>
                  <Form.Control
                    type="text"
                    name="yearOfStudy"
                    value={signupData.yearOfStudy}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <Form.Label>Internship Domain</Form.Label>
                  <Form.Control
                    type="text"
                    name="internshipDomain"
                    value={signupData.internshipDomain}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Preferred Mode</Form.Label>
                  <Form.Select
                    name="preferredMode"
                    value={signupData.preferredMode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </Form.Select>
                </div>
                <div className="col-md-4 mb-3">
                  <Form.Label>Document (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="document"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    <FaEnvelope className="me-2" /> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Label>
                    <FaLock className="me-2" /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {showOtpField && !verifiedOtp && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
            </>
          )}

          {activeTab === "login" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaEnvelope className="me-2" /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaLock className="me-2" /> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-end mb-3">
                <button
                  type="button"
                  className="btn btn-link forgot-link p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#forgotPasswordModal"
                  id="forgot-link"
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="gradient-btn"
            disabled={loading}
            id="login-btn"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : activeTab === "login" ? (
              "Login"
            ) : showOtpField && !verifiedOtp ? (
              "Verify OTP"
            ) : (
              "Signup"
            )}
          </Button>
        </Form>
      </div>

      <ForgotPassword />
    </div>
  );
};

export default Login;
