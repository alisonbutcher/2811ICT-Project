'use strict';
var mongoose = require('mongoose'),
  Group = mongoose.model('Group');

exports.list_all_groups = (req, res) => {
  Group.find({}, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};


exports.create_a_group = (req, res) => {
  var new_group = new Group(req.body);
  new_group.save(function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};


exports.read_a_group = (req, res) => {
  Group.findById(req.params.groupId, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};


exports.update_a_group = (req, res) => {
  Group.findOneAndUpdate({_id: req.params.groupId}, req.body, {new: true}, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};


exports.delete_a_group = (req, res) => {
  Group.deleteOne({
    _id: req.params.groupId
  }, function(err, group) {
    if (err)
      res.send(err);
    res.json({ message: 'Group successfully deleted' });
  });
};
