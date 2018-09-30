'use strict';
module.exports = function (app) {
    var Chat = require('../controllers/chat.controller');

    // channel Routes
    app.route('/api/chat/')
        .get(Chat.list_all_chats)
        .post(Chat.add_to_a_chat);

        
    app.route('/api/chat/:channelname')
        .get(Chat.read_a_chat_byname)
        .delete(Chat.delete_a_chat_byname);
};