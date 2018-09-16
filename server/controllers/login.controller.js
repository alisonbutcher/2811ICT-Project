'use strict';
var mongoose = require('mongoose'),
  Login = mongoose.model('User'),
  UserRole = mongoose.model('UserRole');

// exports.list_all_users = function(req, res) {
//   Login.find({}, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };



exports.login = function(req, res) {
    // Build Query
    let query = JSON.parse('{"name": "' + req.body.name + '", "password": "' + req.body.password + '"}');

    let u = null;

    // Perform user Query 
    //TODO: For some reason the mongoose findOne query returns nothing so use find() instead
        Login.find(query, 'name email', function(err, user) {
            if (err) 
                res.send(err);

            // If there is data the username and password are correct
            if (user.length > 0) {
                // res.json(user);

                console.log(user);
                u = user;
            } else {
                res.json({ message: 'Username or password Incorrect'});
        }

        if (u != null) {
            console.log("we have a user object");
            // Build user role query
            let rolequery = JSON.parse('{"userId": "' + u[0]._id + '"}');
            UserRole.find(rolequery, 'accessLevel', function(error, userRole) {
                console.log(userRole.length);
                if (userRole.length > 0) {
                    console.log(JSON.stringify(userRole[0].accessLevel));
                    // Build output json
                    // TODO: We cant access elements in the returned userRole for some reason.
                    let out = '{"name": "' + u[0].name + '", "email": "' + u[0].email + '", "accessLevel": "' + userRole[0].accessLevel + '"}';
                    console.log(out);
                    res.json(userRole + u); // TODO: When the above is fixed remove this
                } else {
                    res.json({ message: 'user found but no role for user not found'});
                }
            })
        }
    });
    
    // Login.find(req.body, function(err, user) {
    // if (err)
    //   res.send(err);
    // // Validate user
    // console.log(user);
    // console.log(req.body.name);
    // if (req.body == user.name) {
    //     console.log("user: " + user.name);
    //     res.json(user);
    // } else {
    //     res.json({ message: 'Login Unsuccessful'});
    // }
//   });
};

// exports.update_a_user = function(req, res) {
//   User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };

// exports.delete_a_user = function(req, res) {
//   User.deleteOne({
//     _id: req.params.userId
//   }, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'User successfully deleted' });
//   });
// };
