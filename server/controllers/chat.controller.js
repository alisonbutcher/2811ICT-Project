'use strict';
var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');


exports.read = (channel_name, data) => {

    let query = JSON.parse('{ "channelname": "' +  channel_name + '" }');

    Chat.find(query, 'channelname username msg', function (err, chat) {
        if (err)
            console.log(err);
        data(chat);
    });
};


exports.write = (message, data) => {
    let new_msg = new Chat(message);
    new_msg.save(function (err, cht) {
        if (err)
            console.log(err);
        data(cht);
    });
}




