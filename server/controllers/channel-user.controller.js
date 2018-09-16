'use strict';
var mongoose = require('mongoose'),
  ChannelUser = mongoose.model('ChannelUser');

exports.list_all_channel_users = function(req, res) {
  ChannelUser.find({}, function(err, channeluser) {
    if (err)
      res.send(err);
    res.json(channeluser);
  });
};

exports.create_a_channel_user = function(req, res) {
  var new_channelUser = new ChannelUser(req.body);
  new_channelUser.save(function(err, channeluser) {
    if (err)
      res.send(err);
    res.json(channeluser);
  });
};

exports.read_a_channel_user = function(req, res) {
  ChannelUser.findById(req.params.channelUserId, function(err, channeluser) {
    if (err)
      res.send(err);
    res.json(channeluser);
  });
};

exports.update_a_channel_user = function(req, res) {
  ChannelUser.findOneAndUpdate({_id: req.params.channelUserId}, req.body, {new: true}, function(err, channeluser) {
    if (err)
      res.send(err);
    res.json(channeluser);
  });
};

exports.delete_a_channel_user = function(req, res) {
  ChannelUser.deleteOne({
    _id: req.params.channelUserId
  }, function(err, channeluser) {
    if (err)
      res.send(err);
    res.json({ message: 'User deleted successfully from channel' });
  });
};