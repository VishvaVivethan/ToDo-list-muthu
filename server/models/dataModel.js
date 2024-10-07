// server/models/dataModel.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    value: String,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
