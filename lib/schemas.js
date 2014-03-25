'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    'version': {
        type: Number,
        default: 1
    },
    'username': String,
    'email': String,
    'realName': String,
    'facebookId': String,
    'joinDate': Date
});

var User = mongoose.model('user', userSchema);

module.exports = {
    User: User
};
