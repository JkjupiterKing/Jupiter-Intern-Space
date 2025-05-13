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

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    phoneNumber: "",
    collegeName: "",
    degree: "",
    department: "",
    yearOfStudy: "",
    internshipDomain: "",
    preferredMode: "",
    document: null,
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (activeTab === "login") {
      setLoginData({
        ...loginData,
        [name]: value,
      });
    } else {
      setSignupData({
        ...signupData,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (activeTab === "login") {
        const response = await fetch("https://your-api.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        const result = await response.json();
        if (response.ok) {
          setMessage("Login successful!");
          navigate("/home");
        } else {
          setMessage(result.message || "Invalid credentials.");
        }
      } else {
        const formPayload = new FormData();
        for (const key in signupData) {
          formPayload.append(key, signupData[key]);
        }

        const response = await fetch("https://your-api.com/signup", {
          method: "POST",
          body: formPayload,
        });

        const result = await response.json();
        if (response.ok) {
          setMessage("Signup successful! Please login.");
          setActiveTab("login");
        } else {
          setMessage(result.message || "Signup failed.");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div
      className="login-bg"
      style={{
        background: "url('/Background.png') no-repeat center center",
      }}
    >
      <div
        className={`form-box ${activeTab === "signup" ? "signup-mode" : ""}`}
      >
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "50px", color: "white" }}
          />
          <h4 className="mb-0" style={{ color: "white" }}>
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

        <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
          {activeTab === "signup" && (
            <>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Form.Label>
                    <FaUser className="me-2" /> Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
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
                    accept=".pdf,.doc,.docx"
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
            className="gradient-btn w-100"
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
      </div>

      <ForgotPassword />
    </div>
  );
};

export default Login;
