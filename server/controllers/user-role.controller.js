'use strict';
var mongoose = require('mongoose'),
  UserRole = mongoose.model('UserRole');

exports.list_all_user_roles = function(req, res) {
  UserRole.find({}, function(err, userrole) {
    if (err)
      res.send(err);
    res.json(userrole);
  });
};

exports.create_a_user_role = function(req, res) {
  var new_userRole = new UserRole(req.body);
  new_userRole.save(function(err, userrole) {
    if (err)
      res.send(err);
    res.json(userrole);
  });
};

exports.read_a_user_role = function(req, res) {
  UserRole.findById(req.params.userRoleId, function(err, userrole) {
    if (err)
      res.send(err);
    res.json(userrole);
  });
};

exports.update_a_user_role = function(req, res) {
  UserRole.findOneAndUpdate({_id: req.params.userRoleId}, req.body, {new: true}, function(err, userrole) {
    if (err)
      res.send(err);
    res.json(userrole);
  });
};

exports.delete_a_user_role = function(req, res) {
  UserRole.deleteOne({
    _id: req.params.userRoleId
  }, function(err, userrole) {
    if (err)
      res.send(err);
    res.json({ message: 'User Role successfully deleted' });
  });
};

