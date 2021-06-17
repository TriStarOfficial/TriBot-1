const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    UserID: String,
    Reason: String,
    MessagesLeft: { type: Number, default: 3 },
    Time: String
});

module.exports = new mongoose.model('Afk', Schema, 'afks')