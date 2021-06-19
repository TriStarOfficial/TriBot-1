const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    UserID: String,
    Reason: String,
    Time: String
});

module.exports = new mongoose.model('Afk', Schema, 'afks')