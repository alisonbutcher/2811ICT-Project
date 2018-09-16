'use strict';
var mongoose = require('mongoose'),
  Role = mongoose.model('Role');

exports.list_all_roles = function(req, res) {
  Role.find({}, function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};

exports.create_a_role = function(req, res) {
  var new_role = new Role(req.body);
  new_role.save(function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};

exports.read_a_role = function(req, res) {
  Role.findById(req.params.roleId, function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};

exports.update_a_role = function(req, res) {
  Role.findOneAndUpdate({_id: req.params.roleId}, req.body, {new: true}, function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};

exports.delete_a_role = function(req, res) {
  Role.deleteOne({
    _id: req.params.roleId
  }, function(err, role) {
    if (err)
      res.send(err);
    res.json({ message: 'Role successfully deleted' });
  });
};

