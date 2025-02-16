import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/LOGO.png";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky-top bg-dark text-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
        <div className="container">
          {/* Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="NEW FACT ENGINEERING" className="logo me-2" />
            <span className="brand-name fw-bold">NEW FACT ENGINEERING</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/' ? 'active-nav-link' : ''}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/services' ? 'active-nav-link' : ''}`}
                  to="/services"
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/projects' ? 'active-nav-link' : ''}`}
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/social-service' ? 'active-nav-link' : ''}`}
                  to="/social-service"
                >
                  Social Service
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/media' ? 'active-nav-link' : ''}`}
                  to="/media"
                >
                  Media
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/careers' ? 'active-nav-link' : ''}`}
                  to="/careers"
                >
                  Careers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${location.pathname === '/contact' ? 'active-nav-link' : ''}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
