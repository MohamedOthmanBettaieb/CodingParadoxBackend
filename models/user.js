const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String, required:[true, 'a username is required']},
    password: {type:String, required:[true, 'a password is required']},

});

const user = mongoose.model('user', userSchema);
module.exports = 'user';