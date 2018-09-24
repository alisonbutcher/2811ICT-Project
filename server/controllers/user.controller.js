'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User')

// Get all users
exports.list_all_users = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// Create a user
exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// Read a single user
exports.read_a_user = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// Update a user
exports.update_a_user = function (req, res) {
    User.findOneAndUpdate({
        _id: req.params.userId
    }, req.body, {
        new: true
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};



// Delete a user
exports.delete_a_user = function (req, res) {
    User.deleteOne({
        _id: req.params.userId
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User successfully deleted'
        });
    });
};

exports.login = function (req, res) {
    // Build Query
    let query = JSON.parse('{"name": "' + req.body.name + '", "password": "' + req.body.password + '"}');

    // Perform user Query 
    User.find(query, 'name email role', function (err, user) {
        if (err)
            res.send(err);

        // If there is data the username and password are correct
        if (user.length > 0) {
            res.json(user)
        } else {
            res.json({
                message: 'Username or password Incorrect'
            });
        }
    });
};
