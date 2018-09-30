module.exports = function(app, io){
    console.log("Server sockets initialised");

    // TODO: Link database to history

   // Websocket connection
    io.on('connection', (socket) => {
        let rm;

        // console.log('user connected');

        // Separate chat room selection (channel)
        socket.on('changeRoom', (room) => {
            socket.leave(socket.room);
            socket.join(room);
            socket.emit('updateChat', {type:'message', text: 'Welcome to ' + room});
            socket.room = room;
            rm = room;
            console.log('joined room ' + room);
        })
        
        // Disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        // Room specific messages
        socket.on('sendMessage', (message) => {
            io.sockets.in(socket.room).emit('updateChat', {type:'message', text: message});
            console.log('Room: ' + socket.room + ', ' + message);
        });
    });
}