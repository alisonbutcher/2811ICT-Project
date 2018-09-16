'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChannelUserSchema = new Schema({
    channelId: {
        type: String,
        required: 'Please enter a channelId'
    },
    userId: {
        type: String,
        required: 'Please enter a userId'
    }
});

module.exports = mongoose.model('ChannelUser', ChannelUserSchema);