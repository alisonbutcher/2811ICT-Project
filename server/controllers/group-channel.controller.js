'use strict';
var mongoose = require('mongoose'),
  GroupChannel = mongoose.model('GroupChannel');

exports.list_all_group_channels = function(req, res) {
  GroupChannel.find({}, function(err, groupchannel) {
    if (err)
      res.send(err);
    res.json(groupchannel);
  });
};

exports.create_a_group_channel = function(req, res) {
  var new_groupChannel = new GroupChannel(req.body);
  new_groupChannel.save(function(err, groupchannel) {
    if (err)
      res.send(err);
    res.json(groupchannel);
  });
};

exports.read_a_group_channel = function(req, res) {
  GroupChannel.findById(req.params.groupChannelId, function(err, groupchannel) {
    if (err)
      res.send(err);
    res.json(groupchannel);
  });
};

exports.update_a_group_channel = function(req, res) {
  GroupChannel.findOneAndUpdate({_id: req.params.groupChannelId}, req.body, {new: true}, function(err, groupchannel) {
    if (err)
      res.send(err);
    res.json(groupchannel);
  });
};

exports.delete_a_group_channel = function(req, res) {
  GroupChannel.deleteOne({
    _id: req.params.groupChannelId
  }, function(err, groupchannel) {
    if (err)
      res.send(err);
    res.json({ message: 'Channel deleted successfully from group' });
  });
};