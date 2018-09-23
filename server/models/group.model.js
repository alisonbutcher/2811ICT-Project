'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroupSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a group name'
    },
    description: {
        type: String
    },
    users: [{
        username: String
    }],
    channels: [{
        channelname: String
    }]
});

module.exports = mongoose.model('Group', GroupSchema);