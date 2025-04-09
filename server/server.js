const nodemailer = require('nodemailer');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { all } = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;
const allowedOrigins = ['http://localhost:3000', 'https://nfe-web-inky.vercel.app'];

// Strict CORS configuration
// app.use(cors({
//   origin: function(origin, callback) {
//     // Block requests with no origin (like direct browser access)
//     if (!origin) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   maxAge: 86400 // 24 hours
// }));


app.use(cors({
  origin: allowedOrigins, // Allow only your frontend domain
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type'] // Allowed headers
}));
// Middleware to block direct browser access
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // Block requests without proper origin or referer
  if (!origin || !referer) {
    return res.status(403).json({ error: 'Access denied: Direct browser access not allowed' });
  }
  
  // Check if the origin is in the allowed list
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Access denied: Origin not allowed' });
  }
  
  // Check if the referer starts with an allowed origin
  const isAllowedReferer = allowedOrigins.some(allowedOrigin => 
    referer.startsWith(allowedOrigin)
  );
  
  if (!isAllowedReferer) {
    return res.status(403).json({ error: 'Access denied: Referer not allowed' });
  }
  
  next();
});

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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Endpoint to get Firebase configuration
app.get('/firebase-config', (req, res) => {
  res.status(200).json(firebaseConfig);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

