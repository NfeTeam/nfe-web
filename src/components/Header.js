import React from 'react';
import { Link } from 'react-router-dom';
import logo from './engineering.png';

const Header = () => {
  return (
    <header className="sticky-top bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="NEW FACT ENGINEERING" height="40" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/projects">Projects</Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/social-service">Social Service</Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
