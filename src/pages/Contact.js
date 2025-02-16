import React, { useState } from 'react';
import Background from "../images/background-page-4.jpg";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, subject, message } = formData;

    const emailBody = `Hello NFE Team,\n\n${message}\n\nRegards,\n${name}`;

    const mailtoLink = `mailto:nfeteam24@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open the mail client with the constructed mailto link
    window.location.href = mailtoLink;
  };

  // Add WhatsApp click handler
  const handleWhatsAppClick = () => {
    const phoneNumber = '+6584048528'; // Replace with your actual WhatsApp number
    const message = 'Hello, I would like to know more about New Fact Engineering services.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="position-relative">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.1,
          zIndex: -1,
        }}
      ></div>
      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold">Get In Touch</h1>
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="bg-white rounded-3 shadow-sm p-4 p-md-5">
              <h2 className="mb-4 fw-bold">Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control form-control-lg"
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg px-5">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white rounded-3 shadow-sm p-4 p-md-5">
              <h2 className="mb-4 fw-bold">Contact Information</h2>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <FaMapMarkerAlt className="text-primary fs-2 me-3" />
                </div>
                <div>
                  <h5 className="fw-bold">Our Location</h5>
                  <p className="mb-0">
                    NEW FACT ENGINEERING LTD<br />
                    Dubai Kurukku Sandhu,<br />
                    Dubai Mainroad,<br />
                    Dubai 420
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <FaPhone className="text-primary fs-2 me-3" />
                </div>
                <div>
                  <h5 className="fw-bold">Phone Number</h5>
                  <p className="mb-0">+971 123 456 7890</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <FaEnvelope className="text-primary fs-2 me-3" />
                </div>
                <div>
                  <h5 className="fw-bold">Email Address</h5>
                  <p className="mb-0">info@newfactengineering.com</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="flex-shrink-0">
                  <FaClock className="text-primary fs-2 me-3" />
                </div>
                <div>
                  <h5 className="fw-bold">Working Hours</h5>
                  <p className="mb-0">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Chat Bubble */}
        <div
          onClick={handleWhatsAppClick}
          className="whatsapp-bubble position-fixed end-0 mb-4 me-4 cursor-pointer animate__animated animate__fadeIn"
          style={{
            width: '300px',
            borderRadius: '20px',
            backgroundColor: '#25D366',
            color: 'white',
            padding: '15px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s',
            bottom: '15%', // Set a fixed value to keep it in place
          }}
        >
          <FaWhatsapp size={30} />
          <div style={{ marginLeft: '10px' }}>
            <h5 style={{ margin: 0 }}>Chat with us!</h5>
            <p style={{ margin: 0, fontSize: '12px' }}>Tap to start a chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;