// Get Chat Database
let db = require('./controllers/chat.controller');

module.exports = function (app, io) {
    console.log("Server sockets initialised");

    // Websocket connection
    io.on('connection', (socket) => {

        // Separate chat room selection (channel)
        socket.on('changeRoom', (room) => {

            // Leave old room
            socket.leave(socket.room);

            // Join the new room
            socket.join(room);

            // Welcome message
            let m = JSON.parse('{ "channelname": "' + room + '", "username": "CHAT-SERVER", "msg": "Welcome to ' + room + '" }');
            socket.emit('UpdateChat', m);

            // Store room
            socket.room = room;

            // Get history from db
            db.read(room, function (data) {

                // Loop over each historical chat message returned from db
                Object.keys(data).forEach(function (key) {

                    // For each message emit to channel
                    socket.emit('UpdateChat', data[key]);

                });

            });
        });


        // Disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


        // Room specific messages
        socket.on('sendMessage', (message) => {

            // Emit to channel
            io.sockets.in(socket.room).emit('UpdateChat', message);

            // Write message to database
            db.write(message, (data) => {});

        });
    });
}
