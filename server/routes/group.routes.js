'use strict';
module.exports = function(app) {
  var Group = require('../controllers/group.controller');

  // group Routes
  app.route('/api/group')
    .get(Group.list_all_groups)
    .post(Group.create_a_group);

  app.route('/api/group/:name')
    .put(Group.update_a_group_byname)
    .get(Group.read_a_group_byname)
    .delete(Group.delete_a_group_byname);

  app.route('/api/group/id/:_id')
    .get(Group.read_a_group_byid)
    .put(Group.update_a_group_byid)
    .delete(Group.delete_a_group_byid);
};
