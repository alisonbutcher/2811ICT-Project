'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RoleSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a role name'
    },
    description: {
        type: String,
        required: 'Please enter a role description'
    },
    accessLevel: {
        type: Number
    }

});

module.exports = mongoose.model('Role', RoleSchema);