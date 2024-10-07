const User = require('../models/userModel'); // Ensure this path is correct
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { email, phoneNum, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, phoneNum, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};
