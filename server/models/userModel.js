const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: { type: String },
    otpExpiry: { type: Date },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
