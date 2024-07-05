const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aayushkhambayate123@gmail.com', // replace with your email
      pass: 'Aayush@123'   // replace with your email password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Subscription Confirmation',
    text: 'Thank you for subscribing!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Subscription email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
