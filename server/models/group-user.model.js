'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GroupUserSchema = new Schema({
    groupId: {
        type: String,
        required: 'Please enter a groupId'
    },
    userId: {
        type: String,
        required: 'Please enter a userId'
    }
});

module.exports = mongoose.model('GroupUser', GroupUserSchema);