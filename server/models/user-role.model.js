'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserRoleSchema = new Schema({
    roleId: {
        type: String,
        required: 'Please enter a roleId'
    },
    userId: {
        type: String,
        required: 'Please enter a userId'
    }
});

module.exports = mongoose.model('UserRole', UserRoleSchema);