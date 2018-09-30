module.exports = function(app, io){
    console.log("Server socket initialised");

    io.on('connection', (socket)=>{
        console.log('user connected');
        
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('add-message', (message)=>{
            io.emit('message', {type:'message', text: message});
        });
    });
}