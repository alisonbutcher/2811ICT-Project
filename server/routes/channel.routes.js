'use strict';
module.exports = function(app) {
  var Channel = require('../controllers/channel.controller');

  // channel Routes
  app.route('/api/channel')
    .get(Channel.list_all_channels)
    .post(Channel.create_a_channel);

  app.route('/api/channel/:channelId')
    .get(Channel.read_a_channel)
    .put(Channel.update_a_channel)
    .delete(Channel.delete_a_channel);
};

