'use strict';
var mongoose = require('mongoose'),
  Channel = mongoose.model('Channel');

exports.list_all_channels = (req, res) => {
  Channel.find({}, function(err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.create_a_channel = (req, res) => {
  var new_channel = new Channel(req.body);
  new_channel.save(function(err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.read_a_channel = (req, res) => {
  Channel.findById(req.params.channelId, function(err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.update_a_channel = (req, res) => {
  Channel.findOneAndUpdate({_id: req.params.channelId}, req.body, {new: true}, function(err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.delete_a_channel = (req, res) => {
  Channel.deleteOne({
    _id: req.params.channelId
  }, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Channel successfully deleted' });
  });
};
