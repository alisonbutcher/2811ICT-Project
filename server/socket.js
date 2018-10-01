
// Get Chat Database
let db = require('./controllers/chat.controller');

module.exports = function(app, io){
    console.log("Server sockets initialised");

    // TODO: Link database to history

   // Websocket connection
    io.on('connection', (socket) => {
        var chathistory;

        console.log('user connected');

        // Separate chat room selection (channel)
        socket.on('changeRoom', (room) => {
            
            // Leave old room
            socket.leave(socket.room);

            // Join the new room
            socket.join(room);

            // Welcome message
            let m = JSON.parse('{ "channelname": "' + room + '", "username": "CHAT-SERVER", "msg": "Welcome to ' + room + '" }');
            socket.emit('UpdateChat', m);

            socket.room = room;

            console.log('Joined ' + room);
            
            // Get history from db
            db.read(room, function(data) {
                chathistory = data;
                // console.log(chathistory);

            // Send each chathistory message one by one to socket
            Object.keys(chathistory).forEach(function(key) {
                socket.emit('UpdateChat', chathistory[key]);
            });
                
                // socket.emit('UpdateChat', chathistory);
            });
        });

        
        // Disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


        // Room specific messages
        socket.on('sendMessage', (message) => {

            // build emit message
            // let e = JSON.parse('{ "type": "message", "text": "[' + message.username + '] ' + message.msg + '" }');

            // Emit to channel
            io.sockets.in(socket.room).emit('UpdateChat', message);

            // io.sockets.in(socket.room).emit('updateChat', {type:'message', text: message});

            // // Format message for save to db
            // let m = JSON.parse('{ "channelname": "' + message.channelname + '", "username": "' +
            //     message.username + '", "msg": "' + message.msg + '" }');
            
            // Write message to database
            db.write(message, (data) => {
                // console.log('pushed: ' + data);
            });

            console.log('Room: ' + socket.room + ', ' + message);
        });
    });
}