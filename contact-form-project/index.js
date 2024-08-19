const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Add this line

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());  // Add this line

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'ResumeCraft.in@gmail.com',
    pass: 'ggcsztdbpqksxyxy'
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Error with the email transporter:', error);
  } else {
    console.log("Server is ready to send emails");
  }
});

// Handle form submission
app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `${email}`,
    to: 'ResumeCraft.in@gmail.com',
    subject: 'New Feedback Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('An error occurred while sending the message');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});