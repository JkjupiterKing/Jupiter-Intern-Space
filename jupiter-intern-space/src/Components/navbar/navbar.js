import React, { useState } from 'react';
import './navbar.css';
import { Home, BookOpen, Users, Monitor, FileText, Video, Award, Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
    return (
        <div className={`navbar ${isOpen ? 'expanded' : ''}`}>
        <div className="navbar-header">
          <div className="menu-icon" onClick={toggleMenu}>
            <MenuIcon size={24} color="white" />
            <span>Menu</span>
          </div>
        </div>
        
        <div className="navbar-links">
          <Link to="/dashboard" className="nav-item">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link to="/college-management" className="nav-item active">
            <BookOpen size={20} />
            <span>College Management</span>
          </Link>
          
          <Link to="/intern-management" className="nav-item">
            <Users size={20} />
            <span>Intern Management</span>
          </Link>
          
          <Link to="/internship-technologies" className="nav-item">
            <Monitor size={20} />
            <span>Internship Technologies</span>
          </Link>
          
          <Link to="/academic-projects" className="nav-item">
            <FileText size={20} />
            <span>Academic Projects</span>
          </Link>
          
          <Link to="/academic-workshops" className="nav-item">
            <Video size={20} />
            <span>Academic Workshops</span>
          </Link>
          
          <Link to="/certificate-management" className="nav-item">
            <Award size={20} />
            <span>Certificate Management</span>
          </Link>
        </div>
      </div>
    );
  };

export default Navbar;
