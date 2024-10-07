// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  console.log('MongoDB URI:', process.env.MONGODB_URI); 
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB; // Ensure this line is present


// // Import necessary packages
// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables from .env file

// // Connect to MongoDB using the MONGODB_URI from the .env file
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // Define a User schema
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         default: 'default@example.com'
//     },
//     password: {
//         type: String,
//         required: true,
//         default: 'defaultPassword123'
//     }
// });

// // Create a User model
// const User = mongoose.model('User', userSchema);

// // Function to create a new user
// const createUser = async () => {
//     try {
//         const user = new User(); // This will use the default values
//         await user.save();
//         console.log('User created with default values:', user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// };

// // Call the function to create a user
// createUser().then(() => {
//     // Close the connection after creating the user
//     mongoose.connection.close();
// });
