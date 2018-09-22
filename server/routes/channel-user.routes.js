'use strict';
module.exports = function(app) {
  var ChannelUser = require('../controllers/channel-user.controller');

  // Channel User Routes
  app.route('api/channel-user')
    .get(ChannelUser.list_all_channel_users)
    .post(ChannelUser.create_a_channel_user);


  app.route('api/channel-user/:channelUserId')
    .get(ChannelUser.read_a_channel_user)
    .put(ChannelUser.update_a_channel_user)
    .delete(ChannelUser.delete_a_channel_user);
};
