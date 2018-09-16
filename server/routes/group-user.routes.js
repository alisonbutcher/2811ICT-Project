'use strict';
module.exports = function(app) {
  var GroupUser = require('../controllers/group-user.controller');

  // Group User Routes
  app.route('/group-user')
    .get(GroupUser.list_all_group_users)
    .post(GroupUser.create_a_group_user);


  app.route('/group-user/:groupUserId')
    .get(GroupUser.read_a_group_user)
    .put(GroupUser.update_a_group_user)
    .delete(GroupUser.delete_a_group_user);
};
