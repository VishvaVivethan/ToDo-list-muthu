const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

// router.post('/login', async (req, res) => {
//     const { email, password, name, value } = req.body;

//     // Validate request body
//     if (!email && !name) {
//         return res.status(400).send('Email or name is required');
//     }
//     if (!password || !value) {
//         return res.status(400).send('Password and value are required');
//     }

//     try {
//         const user = await User.findOne({
//             $or: [
//                 { email },
//                 { name }
//             ]
//         });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).send('Invalid credentials');
//         }
//         if (!data || !(await bcrypt.compare(value, data.value))) {
//             return res.status(400).send('Invalid value');
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         res.json({ token });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).send('Internal server error');
//     }
// });





// Send OTP for forgot password




router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}`,
        });
        res.send('OTP sent');
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).send('Error sending OTP');
    }
});

// Change password
router.post('/change-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) return res.status(400).send('Invalid OTP');

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null; // Clear OTP after usage
    await user.save();

    res.send('Password changed successfully');
});

module.exports = router;
