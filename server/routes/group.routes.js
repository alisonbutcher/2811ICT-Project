'use strict';
module.exports = function(app) {
  var Group = require('../controllers/group.controller');

  // group Routes
  app.route('/group')
    .get(Group.list_all_groups)
    .post(Group.create_a_group);

  app.route('/group/:groupId')
    .get(Group.read_a_group)
    .put(Group.update_a_group)
    .delete(Group.delete_a_group);
};
