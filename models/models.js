const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var models = {};

const userSchema = new Schema({
    email: { type: String, unique: true },
    nickname: String,
    password: String
});

models.User = mongoose.model('User', userSchema);

module.exports = models;