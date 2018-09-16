'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroupChannelSchema = new Schema({
    groupId: {
        type: String,
        required: 'Please enter a groupId'
    },
    channelId: {
        type: String,
        required: 'Please enter a channelId'
    }
});

module.exports = mongoose.model('GroupChannel', GroupChannelSchema);