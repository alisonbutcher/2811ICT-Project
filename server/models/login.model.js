'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LoginSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a user name'
    },
    password: {
        type: String,
        required: 'Please enter a password'
    },
    email: {
        type: String
    }

});

module.exports = mongoose.model('Login', LoginSchema);