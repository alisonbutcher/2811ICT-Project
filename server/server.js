const path = require('path');
const cors = require('cors');
const express = require('express');
const config = require('config');
// const io = require('socket.io')(http);
app = express();
mongoose = require('mongoose');
User = require('./models/user.model');
Group = require('./models/group.model');
Channels = require('./models/channel.model');
Chat = require('./models/chat.model');
bodyParser = require('body-parser');

port = config.ServerPort;

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

var chat = require('./routes/chat.routes');
chat(app);


// Static Directory for Angular Client Side app
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/client/index.html'))
});


// Start HTTP Server
require('./listen')(app, port);

module.exports = app // used by unit and integration testing