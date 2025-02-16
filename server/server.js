const nodemailer = require('nodemailer');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 5000;
const allowedOrigins = ['http://localhost:3000', 'https://nfe-web-inky.vercel.app'];

app.use(cors({
    origin: allowedOrigins, // Allow only your frontend domain
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type'] // Allowed headers
  }));
// Configure storage for file uploads (resume and CV)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be uploaded to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage });

// Setup the Nodemailer transporter using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail email address
    pass: process.env.GMAIL_PASSWORD, // Your Gmail password or App password
  },
});

// Endpoint to send email with attachments
app.post('/send-email', upload.fields([{ name: 'resume' }, { name: 'cv' }]), (req, res) => {
  const { email, name, jobTitle } = req.body; // Applicant details
  const resume = req.files['resume'][0]; // Uploaded resume file
  const cv = req.files['cv'][0]; // Uploaded CV file

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'nfeteam24@gmail.com', // Replace with your recipient's email address
    subject: `Job Application: ${jobTitle} - ${name}`,
    text: `You have received a job application from ${name} (${email}) for the position of ${jobTitle}.`,
    attachments: [
      {
        filename: resume.originalname,
        path: resume.path,
      },
      {
        filename: cv.originalname,
        path: cv.path,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email.');
    }
    
    // Clean the uploads folder after sending the email
    fs.unlink(resume.path, (err) => {
      if (err) console.log(`Error deleting resume: ${err}`);
    });
    fs.unlink(cv.path, (err) => {
      if (err) console.log(`Error deleting CV: ${err}`);
    });

    res.status(200).send('Email sent successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
