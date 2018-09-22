'use strict';
module.exports = function(app) {
  var GroupChannel = require('../controllers/group-channel.controller');

  // Group Channel Routes
  app.route('api/group-channel')
    .get(GroupChannel.list_all_group_channels)
    .post(GroupChannel.create_a_group_channel);


  app.route('api/group-channel/:groupChannelId')
    .get(GroupChannel.read_a_group_channel)
    .put(GroupChannel.update_a_group_channel)
    .delete(GroupChannel.delete_a_group_channel);
};
