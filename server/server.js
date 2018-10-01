const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const config = require('config');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Group = require('./models/group.model');
const Channels = require('./models/channel.model');
const Chat = require('./models/chat.model');
const bodyParser = require('body-parser');
const port = config.ServerPort;

// Set maximum discrete number of endpoints
app.setMaxListeners(20);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, {
    useNewUrlParser: true
});

// Configure Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Configure CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))


// REST API routes

// User Routes
var user = require('./routes/user.routes');
user(app);

// Group Routes
var groups = require('./routes/group.routes');
groups(app);

// Channels Routes
var channels = require('./routes/channel.routes');
channels(app);


// Static Directory for Angular Client Side app
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/client/index.html'))
});


// Websockets
require('./socket.js')(app,io);


// Start HTTP Server
require('./listen')(http, port);


// used by unit and integration testing
module.exports = app 