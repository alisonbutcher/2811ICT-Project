'use strict';
var mongoose = require('mongoose'),
  Login = mongoose.model('User'),
  UserRole = mongoose.model('UserRole');

exports.login = function(req, res) {
    // Build Query
    let query = JSON.parse('{"name": "' + req.body.name + '", "password": "' + req.body.password + '"}');

    let u = null;

    // Perform user Query 
        Login.find(query, 'name email', function(err, user) {
            if (err) 
                res.send(err);

            // If there is data the username and password are correct
            if (user.length > 0) {
                u = user;
            } else {
                res.json({ message: 'Username or password Incorrect'});
        }

        if (u != null) {
            // Build user role query
            let rolequery = JSON.parse('{"userId": "' + u[0]._id + '"}');

            // Perform query on user-roles
            UserRole.find(rolequery, 'accessLevel',{ lean: true }, function(error, userRole) {

                // Is role found
                if (userRole.length > 0) {

                    // Build output json
                    let out = JSON.parse('{"name": "' + u[0].name + '", "email": "' + u[0].email + '", "accessLevel": "' + userRole[0].accessLevel + '"}');
                    
                    // Return user and role access level object
                    res.json(out);

                } else {

                    res.json({ message: 'user found but no role for user not found'});
                }
            })
        }
    });
};

