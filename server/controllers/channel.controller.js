'use strict';
var mongoose = require('mongoose'),
  Channel = mongoose.model('Channel');

exports.list_all_channels = (req, res) => {
  Channel.find({}, function (err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.create_a_channel = (req, res) => {
  // Build Query to check if already exists
  let query = JSON.parse('{"name": "' + req.body.name + '"}');
  // Perform  Query 
  Channel.find(query, 'name description users[]', function (err, chan) {

    // If there is data the channel name already exists
    if (chan.length > 0) {
      res.json({
        message: "Channel already exists"
      });
    } else {
      var new_channel = new Channel(req.body);
      new_channel.save(function (err, channel) {
          if (err)
              res.send(err);
          res.json(channel);
      });
    }
  });
}

// exports.read_a_channel = (req, res) => {
//   Channel.find(req.params.name, function(err, channel) {
//     if (err)
//       res.send(err);
//     res.json(channel);
//   });
// };

exports.read_a_channel = (req, res) => {
  Channel = mongoose.model('Channel');
  // Build Query
  let query = JSON.parse('{"name": "' + req.params.name + '"}');
  console.log(query);

  // Perform user Query 
  Channel.find(query, 'name description users[]', function (err, channel) {
    if (err)
      res.send(err);

    // If there is data the username and password are correct
    if (channel.length > 0) {
      res.json(channel)
    } else {
      res.json({
        message: 'No channel found with that name'
      });
    }
  });
}

exports.update_a_channel_byname = (req, res) => {
  Channel.findOneAndUpdate({
    name: req.params.name
  }, req.body, {
    new: true
  }, function (err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.update_a_channel = (req, res) => {
  Channel.findOneAndUpdate({
    _id: req.params.channelId
  }, req.body, {
    new: true
  }, function (err, channel) {
    if (err)
      res.send(err);
    res.json(channel);
  });
};

exports.delete_a_channel = (req, res) => {
  Channel.deleteOne({
    _id: req.params.channelId
  }, function (err) {
    if (err)
      res.send(err);
    res.json({
      message: 'Channel successfully deleted'
    });
  });
};