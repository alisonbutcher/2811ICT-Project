'use strict';
var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');


exports.list_all_chats = (req, res) => {
    Chat.find({}, function (err, chat) {
        if (err)
            res.send(err);
        res.json(chat);
    });
};



exports.add_to_a_chat = (req, res) => {
    // // Build Query to check if already exists
    // let query = JSON.parse('{"channelname": "' + req.body.channelname + '"}');
    // // Perform  Query 
    // Chat.find(query, 'channelname username msg', function (err, chat) {

        // // If there is data the channel name already exists
        // if (chat.length > 0) {
        //     res.json({
        //         message: "Channel already exists"
        //     });
        // } else {
    var new_chat = new Chat(req.body);
    new_chat.save(function (err, cht) {
        if (err)
            res.send(err);
        res.json(cht);
    });
        // }
}


exports.read_a_chat_byname = (req, res) => {
    // Chat = mongoose.model('Chat');
    // Build Query
    let query = JSON.parse('{"channelname": "' + req.params.channelname + '"}');
    console.log(query);

    // Perform user Query 
    Chat.find(query, 'channelname username msg', function (err, chat) {
        if (err)
            res.send(err);

        // If there is data the username and password are correct
        if (chat.length > 0) {
            res.json(chat)
        } else {
            res.json({
                message: 'No chat conversation found with that name'
            });
        }
    });
}


exports.delete_a_chat_byname = (req, res) => {
    Chat.deleteMany({
        channelname: req.params.channelname
    }, function (err) {
        if (err)
            res.send(err);
        res.json({
            message: 'Chat successfully deleted'
        });
    });
};


