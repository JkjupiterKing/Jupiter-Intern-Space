import React, { useEffect, useState } from "react";
import "./navbar.css";
import {
  Home,
  BookOpen,
  Users,
  Monitor,
  FileText,
  Video,
  Award,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // collapsed by default
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Enable Bootstrap tooltips on mount & when isOpen changes
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button (visible on all screen sizes) */}
      <div className="navbar-toggle">
        <button onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`navbar ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="navbar-links">
          <NavItem
            to="/dashboard"
            icon={<Home size={20} />}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            isOpen={isOpen}
          />
          <NavItem
            to="/college-management"
            icon={<BookOpen size={20} />}
            label="College Management"
            active={location.pathname === "/college-management"}
            isOpen={isOpen}
          />
          <NavItem
            to="/intern-management"
            icon={<Users size={20} />}
            label="Intern Management"
            active={location.pathname === "/intern-management"}
            isOpen={isOpen}
          />
          <NavItem
            to="/internship-technologies"
            icon={<Monitor size={20} />}
            label="Internship Technologies"
            active={location.pathname === "/internship-technologies"}
            isOpen={isOpen}
          />
          <NavItem
            to="/academic-projects"
            icon={<FileText size={20} />}
            label="Academic Projects"
            active={location.pathname === "/academic-projects"}
            isOpen={isOpen}
          />
          <NavItem
            to="/academic-workshops"
            icon={<Video size={20} />}
            label="Academic Workshops"
            active={location.pathname === "/academic-workshops"}
            isOpen={isOpen}
          />
          <NavItem
            to="/certificate-management"
            icon={<Award size={20} />}
            label="Certificate Management"
            active={location.pathname === "/certificate-management"}
            isOpen={isOpen}
          />

          {/* Logout */}
          <div
            className="nav-item logout-item"
            onClick={handleLogout}
            data-bs-toggle={!isOpen ? "tooltip" : ""}
            data-bs-placement="right"
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, isOpen, active }) => (
  <Link
    to={to}
    className={`nav-item ${active ? "active" : ""}`}
    data-bs-toggle={!isOpen ? "tooltip" : ""}
    data-bs-placement="right"
    title={!isOpen ? label : ""}
  >
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Navbar;
