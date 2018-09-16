'use strict';
module.exports = function(app) {
  var Role = require('../controllers/role.controller');

  // role Routes
  app.route('/role')
    .get(Role.list_all_roles)
    .post(Role.create_a_role);


  app.route('/role/:roleId')
    .get(Role.read_a_role)
    .put(Role.update_a_role)
    .delete(Role.delete_a_role);
};
