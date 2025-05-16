import React, { useState } from "react";
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
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Example logout logic (you can adjust based on auth method)
    localStorage.clear();
    navigate("/"); // Redirect to login page
  };

  return (
    <div className={`navbar ${isOpen ? "expanded" : ""}`}>
      <div className="navbar-links">
        <NavItem
          to="/dashboard"
          icon={<Home size={20} />}
          label="Dashboard"
          isOpen={isOpen}
          active={location.pathname === "/dashboard"}
        />
        <NavItem
          to="/college-management"
          icon={<BookOpen size={20} />}
          label="College Management"
          isOpen={isOpen}
          active={location.pathname === "/college-management"}
        />
        <NavItem
          to="/intern-management"
          icon={<Users size={20} />}
          label="Intern Management"
          isOpen={isOpen}
          active={location.pathname === "/intern-management"}
        />
        <NavItem
          to="/internship-technologies"
          icon={<Monitor size={20} />}
          label="Internship Technologies"
          isOpen={isOpen}
          active={location.pathname === "/internship-technologies"}
        />
        <NavItem
          to="/academic-projects"
          icon={<FileText size={20} />}
          label="Academic Projects"
          isOpen={isOpen}
          active={location.pathname === "/academic-projects"}
        />
        <NavItem
          to="/academic-workshops"
          icon={<Video size={20} />}
          label="Academic Workshops"
          isOpen={isOpen}
          active={location.pathname === "/academic-workshops"}
        />
        <NavItem
          to="/certificate-management"
          icon={<Award size={20} />}
          label="Certificate Management"
          isOpen={isOpen}
          active={location.pathname === "/certificate-management"}
        />

        <div className="nav-item logout-item" onClick={handleLogout}>
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isOpen, active }) => (
  <Link to={to} className={`nav-item ${active ? "active" : ""}`}>
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Navbar;
