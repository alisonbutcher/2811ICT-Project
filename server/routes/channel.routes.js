'use strict';
module.exports = function(app) {
  var Channel = require('../controllers/channel.controller');

  // channel Routes
  app.route('/api/channel')
    .get(Channel.list_all_channels)
    .post(Channel.create_a_channel);

  app.route('/api/channel/:name')
    .put(Channel.update_a_channel_byname)
    .get(Channel.read_a_channel_byname)
    .delete(Channel.delete_a_channel_byname);


  app.route('/api/channel/id/:_id')
    .get(Channel.read_a_channel_byid)
    .put(Channel.update_a_channel_byid)
    .delete(Channel.delete_a_channel_byid);
};

