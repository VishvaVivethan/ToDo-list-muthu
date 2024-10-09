// server/models/dataModel.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
