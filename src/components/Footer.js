import React from 'react';
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram, FaTelegram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>NEW FACT ENGINEERING LTD</h5>
            <p>Dubai Kurukku Sandhu, Dubai Mainroad, Dubai 420</p>
          </div>
          <div className="col-md-6">
            <h5>Connect with us</h5>
            <div className="d-flex">
              <a href="#" className="text-white me-3"><FaFacebookF /></a>
              <a href="#" className="text-white me-3"><FaYoutube /></a>
              <a href="#" className="text-white me-3"><FaTwitter /></a>
              <a href="#" className="text-white me-3"><FaInstagram /></a>
              <a href="#" className="text-white me-3"><FaTelegram /></a>
              <a href="#" className="text-white me-3"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p>&copy; 2023 NEW FACT ENGINEERING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

