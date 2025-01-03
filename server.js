require('dotenv').config();
console.log('Environment variables:', {
    email: process.env.EMAIL,
    password: process.env.PASSWORD ? '****' : 'not set'
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// Order Route
app.post('/orders', (req, res) => {
    console.log('Received request body:', req.body);
    const { name, tel, email, order, quantity } = req.body;
    
    console.log('Email config:', {
        from: process.env.EMAIL,
        to: 'mswilfrid@gmail.com'
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'mswilfrid@gmail.com',
        subject: 'New Order Received',
        text: `
            Name: ${name}
            Phone Number: ${tel}
            Email: ${email || 'N/A'}
            Order: ${order}
            Quantity: ${quantity}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Detailed email error:', error);
            return res.status(500).json({ error: 'Error sending email.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Order submitted successfully.' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
