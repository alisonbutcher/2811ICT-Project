'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
    channelname: {
        type: String,
        required: 'Please enter a channel name'
    },
    username: {
        type: String, 
        required: 'Please enter a user name'
    },
    msg: {
        type: String
    }
});

module.exports = mongoose.model('Chat', ChatSchema);