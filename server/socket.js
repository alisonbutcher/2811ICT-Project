module.exports = function(app, io){
    console.log("Server sockets initialised");

    // TODO: Link database to history

   // Websocket connection
    io.on('connection', (socket) => {
        let rm;

        // console.log('user connected');

        // Separate chat room selection (channel)
        socket.on('room', (room) => {
            socket.join(room);
            rm = room;
            console.log('joined room ' + room);
        })
        
        // Disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        // Room specific messages
        socket.on('add-message', (message) => {
            io.sockets.in(rm).emit('message', {type:'message', text: message});
            console.log('Room: ' + rm + ', ' + message);
        });
    });
}