// server/routes/dataRoutes.js
const express = require('express');
const Data = require('../models/dataModel');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).send(newData);
});

// Read
router.get('/', async (req, res) => {
    const data = await Data.find();
    res.send(data);
});

// Update
router.put('/:id', async (req, res) => {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedData);
});

// Delete
router.delete('/:id', async (req, res) => {
    await Data.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
