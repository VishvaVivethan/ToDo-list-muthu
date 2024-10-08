const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const storyRoutes = require('./routes/storyRoutes');
const connectDB = require('./config/database'); 
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/dataRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to start the server
const startServer = async () => {
  await connectDB(); // Connect to MongoDB

  app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/stories', storyRoutes);
  app.use('/api/data', dataRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the server
startServer();

