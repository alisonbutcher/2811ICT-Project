'use strict';
module.exports = function(app) {
  var UserRole = require('../controllers/user-role.controller');

  // user Routes
  app.route('api/user-role')
    .get(UserRole.list_all_user_roles)
    .post(UserRole.create_a_user_role);


  app.route('api/user-role/:userRoleId')
    .get(UserRole.read_a_user_role)
    .put(UserRole.update_a_user_role)
    .delete(UserRole.delete_a_user_role);
};
