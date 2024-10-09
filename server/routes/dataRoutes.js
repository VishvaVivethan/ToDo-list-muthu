
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Data = require('../models/dataModel');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; 
    const newData = new Data({ name, email, password });
    await newData.save();
    res.status(201).send(newData);
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Data.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Read
router.get('/', async (req, res) => {
    const data = await Data.find(); // Exclude password
    res.send(data);
});

// Delete
router.delete('/:id', async (req, res) => {
    await Data.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
