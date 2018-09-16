'use strict';
var mongoose = require('mongoose'),
  Login = mongoose.model('User'),
  Role = mongoose.model('Role');

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

    // Perform Query 
    //TODO: For some reason the mongoose findOne query returns nothing so use find() instead
        Login.find(query, 'name', function(err, user) {
        if (err) 
            res.send(err);

        // If there is data the username and password are correct
        if (user.length > 0) {
            res.json(user);
        } else {
            res.json({ message: 'Username or password Incorrect'});
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
