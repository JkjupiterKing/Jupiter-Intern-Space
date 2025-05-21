import React, { useState, useEffect, useRef } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";
import html2canvas from "html2canvas";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "./certificate-management.css";

const certificateLogo = "/JUPITERKING-LOGO.png";

const CertificateManagement = () => {
  const [formData, setFormData] = useState({
    intern: "",
    college: "",
    technology: "",
    duration: "",
  });

  const [options, setOptions] = useState({
    interns: [],
    colleges: [],
    technologies: [],
  });

  const certificateRef = useRef();

  const durationOptions = [
    "1 Week",
    "2 Weeks",
    "1 Month",
    "2 Months",
    "3 Months",
    "6 Months",
  ];

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [internsRes, collegesRes, technologiesRes] = await Promise.all([
          axios.get("http://localhost:8080/users/all"),
          axios.get("http://localhost:8080/colleges/all"),
          axios.get("http://localhost:8080/internship-technologies/all"),
        ]);

        setOptions({
          interns: internsRes.data,
          colleges: collegesRes.data,
          technologies: technologiesRes.data,
        });
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLabelById = (list, id, labelField) => {
    const item = list.find((el) => el.id === id);
    return item ? item[labelField] : "";
  };

  const handleGenerateCertificate = async () => {
    // Force a re-render and wait briefly before capturing
    setTimeout(async () => {
      const element = certificateRef.current;

      if (!element) {
        console.error("Certificate DOM not found");
        return;
      }

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "internship-certificate.jpg";
      link.click();
    }, 300);
  };

  return (
    <div className="certificate-management-layout">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="main-content">
        <Container>
          <div className="header mb-4">
            <h1>Certificate Management</h1>
          </div>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formIntern">
                <Form.Label>Intern</Form.Label>
                <Form.Select
                  name="intern"
                  value={formData.intern}
                  onChange={handleChange}
                >
                  <option value="">Select Intern</option>
                  {options.interns.map((intern) => (
                    <option key={intern.id} value={intern.id}>
                      {intern.fullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formCollege">
                <Form.Label>College</Form.Label>
                <Form.Select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                >
                  <option value="">Select College</option>
                  {options.colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.collegeName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <br></br>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTechnology">
                <Form.Label>Technology</Form.Label>
                <Form.Select
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                >
                  <option value="">Select Technology</option>
                  {options.technologies.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.technologyname}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map((duration, idx) => (
                    <option key={idx} value={duration}>
                      {duration}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <br></br>
            <Button
              variant="primary"
              onClick={handleGenerateCertificate}
              id="generate-certificate-btn"
              disabled={
                !formData.intern ||
                !formData.college ||
                !formData.technology ||
                !formData.duration
              }
            >
              Generate Certificate (JPG)
            </Button>
          </Form>

          {/* Certificate Design (Offscreen but Visible) */}
          <div
            ref={certificateRef}
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              width: "1100px",
              padding: "50px",
              fontFamily: "Georgia, serif",
              backgroundColor: "#fdfdfd",
              border: "10px solid #2c3e50",
            }}
          >
            <div className="text-center">
              <img
                src={certificateLogo}
                alt="Logo"
                style={{ height: "80px", marginBottom: "20px" }}
              />
              <h2
                className="mb-2"
                style={{ color: "#2c3e50", fontWeight: 700 }}
              >
                Internship Certificate
              </h2>
              <p className="mt-4 mb-2" style={{ fontSize: "18px" }}>
                This is to certify that
              </p>
              <h3 className="fw-bold" style={{ fontSize: "28px" }}>
                {getLabelById(options.interns, formData.intern, "fullName")}
              </h3>
              <p style={{ fontSize: "18px" }}>
                from{" "}
                <strong>
                  {getLabelById(
                    options.colleges,
                    formData.college,
                    "collegeName"
                  )}
                </strong>{" "}
                has successfully completed the internship in{" "}
                <strong>
                  {getLabelById(
                    options.technologies,
                    formData.technology,
                    "technologyname"
                  )}
                </strong>{" "}
                for a duration of <strong>{formData.duration}</strong>.
              </p>

              <p className="mt-4">
                Issued on: {new Date().toLocaleDateString()}
              </p>

              <div
                className="mt-5"
                style={{ textAlign: "right", paddingRight: "100px" }}
              >
                <p>_______________________</p>
                <p>Authorized Signature</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CertificateManagement;
