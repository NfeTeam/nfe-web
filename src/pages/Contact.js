import React, { useState } from 'react';
import Background from "../images/background-page-4.jpg";

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

  return (
    <div style={{position:"relative"}}>
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
          backgroundAttachment: "fixed", // This makes the background fixed
          opacity: 0.3, // Adjust opacity as needed
          zIndex: -1, // Ensure the background is behind content
          animation: "moveBackground 20s ease-in-out infinite",
        }}
      ></div>
      <div className="custom-container py-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h2>Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div className="col-md-1"> </div>
        <div className="col-md-5 mb-4">
          <h2>Our Office</h2>
          <address>
            <strong>NEW FACT ENGINEERING LTD</strong><br />
            Dubai Kurukku Sandhu,<br />
            Dubai Mainroad,<br />
            Dubai 420<br />
            <br />
            <strong>Email:</strong> info@newfactengineering.com<br />
            <strong>Phone:</strong> +971 123 456 7890
          </address>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Contact;








// import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const [status, setStatus] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     emailjs
//       .send(
//         'service_nfe',       // Replace with your EmailJS Service ID
//         'template_g6c5zga',      // Replace with your EmailJS Template ID
//         {
//           from_name: formData.name,
//           from_email: formData.email,
//           subject: formData.subject,
//           message: formData.message,
//           to_email: 'nfeteam24@gmail.com',  // Receiver's email address
//         },
//         '1XmDkwtat4cMHrvsg'        // Replace with your EmailJS Public Key
//       )
//       .then(
//         () => {
//           setStatus('Message sent successfully!');
//           setFormData({ name: '', email: '', subject: '', message: '' });
//         },
//         (error) => {
//           setStatus('Failed to send message. Please try again.');
//           console.error('Error:', error);
//         }
//       );
//   };

//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-5">Contact Us</h1>
//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <h2>Get in Touch</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">Your Name</label>
//               <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Your Email</label>
//               <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="subject" className="form-label">Subject</label>
//               <input type="text" className="form-control" id="subject" value={formData.subject} onChange={handleChange} required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="message" className="form-label">Message</label>
//               <textarea className="form-control" id="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
//             </div>
//             <button type="submit" className="btn btn-primary">Send Message</button>
//           </form>
//           {status && <p className="mt-3">{status}</p>}
//         </div>
//         <div className="col-md-6 mb-4">
//           <h2>Our Office</h2>
//           <address>
//             <strong>NEW FACT ENGINEERING LTD</strong><br />
//             Dubai Kurukku Sandhu,<br />
//             Dubai Mainroad,<br />
//             Dubai 420<br />
//             <br />
//             <strong>Email:</strong> info@newfactengineering.com<br />
//             <strong>Phone:</strong> +971 123 456 7890
//           </address>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;






// import React from 'react';

// const Contact = () => {
//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-5">Contact Us</h1>
//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <h2>Get in Touch</h2>
//           <form>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">Your Name</label>
//               <input type="text" className="form-control" id="name" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Your Email</label>
//               <input type="email" className="form-control" id="email" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="subject" className="form-label">Subject</label>
//               <input type="text" className="form-control" id="subject" required />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="message" className="form-label">Message</label>
//               <textarea className="form-control" id="message" rows={5} required></textarea>
//             </div>
//             <button type="submit" className="btn btn-primary">Send Message</button>
//           </form>
//         </div>
//         <div className="col-md-6 mb-4">
//           <h2>Our Office</h2>
//           <address>
//             <strong>NEW FACT ENGINEERING LTD</strong><br />
//             Dubai Kurukku Sandhu,<br />
//             Dubai Mainroad,<br />
//             Dubai 420<br />
//             <br />
//             <strong>Email:</strong> info@newfactengineering.com<br />
//             <strong>Phone:</strong> +971 123 456 7890
//           </address>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

