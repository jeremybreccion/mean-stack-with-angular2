const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var models = {};

const userSchema = new Schema({
    email: String,
    nickname: String,
    password: String
});

models.User = mongoose.model('User', userSchema);

module.exports = models;