'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChannelSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a channel name'
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Channel', ChannelSchema);
