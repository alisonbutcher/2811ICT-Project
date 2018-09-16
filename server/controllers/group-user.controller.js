'use strict';
var mongoose = require('mongoose'),
  GroupUser = mongoose.model('GroupUser');

exports.list_all_group_users = function(req, res) {
  GroupUser.find({}, function(err, groupuser) {
    if (err)
      res.send(err);
    res.json(groupuser);
  });
};

exports.create_a_group_user = function(req, res) {
  var new_groupUser = new GroupUser(req.body);
  new_groupUser.save(function(err, groupuser) {
    if (err)
      res.send(err);
    res.json(groupuser);
  });
};

exports.read_a_group_user = function(req, res) {
  GroupUser.findById(req.params.groupUserId, function(err, groupuser) {
    if (err)
      res.send(err);
    res.json(groupuser);
  });
};

exports.update_a_group_user = function(req, res) {
  GroupUser.findOneAndUpdate({_id: req.params.groupUserId}, req.body, {new: true}, function(err, groupuser) {
    if (err)
      res.send(err);
    res.json(groupuser);
  });
};

exports.delete_a_group_user = function(req, res) {
  GroupUser.deleteOne({
    _id: req.params.groupUserId
  }, function(err, groupuser) {
    if (err)
      res.send(err);
    res.json({ message: 'User deleted successfully from group' });
  });
};