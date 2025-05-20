import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import "./dashboard.css";
import { FaUniversity, FaUserGraduate, FaLaptopCode } from "react-icons/fa";

const Dashboard = () => {
  const [collegeCount, setCollegeCount] = useState(0);
  const [internCount, setInternCount] = useState(0);
  const [techCount, setTechCount] = useState(0);

  const [colleges, setColleges] = useState([]);
  const [interns, setInterns] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/colleges/all")
      .then((res) => res.json())
      .then((data) => {
        setCollegeCount(data.length);
        setColleges(data);
      });

    fetch("http://localhost:8080/users/all")
      .then((res) => res.json())
      .then((data) => {
        setInternCount(data.length);
        setInterns(data);
      });

    fetch("http://localhost:8080/internship-technologies/all")
      .then((res) => res.json())
      .then((data) => {
        setTechCount(data.length);
        setTechnologies(data);
      });
  }, []);

  return (
    <div className="intern-management-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
        </div>

        {/* Statistic Blocks */}
        <div className="stats-container">
          <div className="stat-block">
            <FaUniversity className="icon" />
            <h2>{collegeCount}</h2>
            <p>Colleges</p>
          </div>
          <div className="stat-block">
            <FaUserGraduate className="icon" />
            <h2>{internCount}</h2>
            <p>Interns</p>
          </div>
          <div className="stat-block">
            <FaLaptopCode className="icon" />
            <h2>{techCount}</h2>
            <p>Technologies</p>
          </div>
        </div>

        {/* Data Lists */}
        <div className="lists-container">
          <div className="list-section">
            <h3>Colleges</h3>
            <ul>
              {colleges.map((college, index) => (
                <li key={index}>{college.collegeName}</li>
              ))}
            </ul>
          </div>

          <div className="list-section">
            <h3>Interns</h3>
            <ul>
              {interns.map((intern, index) => (
                <li key={index}>{intern.fullName}</li>
              ))}
            </ul>
          </div>

          <div className="list-section">
            <h3>Internship Technologies</h3>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech.technologyname}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
