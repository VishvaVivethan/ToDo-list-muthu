// routes/stories.js
const express = require('express');
const Story = require('../models/Story');
const router = express.Router();

// Create a new story
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;  // Include description
    const story = new Story({ title, description });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update story status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a story
router.delete('/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Filter stories by status
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const stories = await Story.find(status ? { status } : {});
    res.status(200).json(stories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
