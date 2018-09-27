'use strict';
module.exports = function (app) {
    var User = require('../controllers/user.controller');

    // user Routes
    app.route('/api/user')
        .get(User.list_all_users)
        .post(User.create_a_user);

    app.route('/api/user/:userId')
        .get(User.read_a_user)
        .put(User.update_a_user)
        .delete(User.delete_a_user);

    // user login route
    app.route('/api/user/login')
        .post(User.login);
};