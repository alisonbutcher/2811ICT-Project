'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
UserRole = mongoose.model('UserRole');

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


// User Login
exports.login = function (req, res) {
    // Build Query
    let query = JSON.parse('{"name": "' + req.body.name + '", "password": "' + req.body.password + '"}');

    let u = null;

    // Perform user Query 
    User.find(query, 'name email', function (err, user) {
        if (err)
            res.send(err);

        // If there is data the username and password are correct
        if (user.length > 0) {
            u = user;
        } else {
            res.json({
                message: 'Username or password Incorrect'
            });
        }

        if (u != null) {
            // Build user role query
            let rolequery = JSON.parse('{"userId": "' + u[0]._id + '"}');

            // Perform query on user-roles
            UserRole.find(rolequery, 'accessLevel', {
                lean: true
            }, function (error, userRole) {

                // Is role found
                if (userRole.length > 0) {

                    // Build output json
                    let out = JSON.parse('{"id": "' + u[0]._id + '", "name": "' + u[0].name + '", "email": "' + 
                        u[0].email + '", "accessLevel": "' + userRole[0].accessLevel + '"}');

                    // Return user and role access level object
                    res.json(out);

                } else {

                    res.json({
                        message: 'user found but no role for user not found'
                    });
                }
            })
        }
    });
};