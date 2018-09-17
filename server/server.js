const path = require('path');
const cors = require('cors');
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./models/user.model'), 
  Group = require('./models/group.model'),
  Channels = require('./models/channel.model'),
  Roles = require('./models/role.model'),
  UserRoles = require('./models/user-role.model'),
  GroupChannels = require('./models/group-channel.model'),
  ChannelUsers = require('./models/channel-user.model'),
  GroupUsers = require('./models/group-user.model'),
  bodyParser = require('body-parser');
  

// Set maximum discrete number of endpoints
app.setMaxListeners(20);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/2811ICT'); 

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure CORS
var corsOptions = {
  origin: 'http://localhost:' + port,
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

// Roles Routes
var roles = require('./routes/role.routes');
roles(app);

// User-Role Routes
var userroles = require('./routes/user-role.routes');
userroles(app);

// Group-Channels Routes
var groupchannels = require('./routes/group-channel.routes');
groupchannels(app);

// Group-Users Routes
var groupusers = require('./routes/group-user.routes');
groupusers(app);

// Channel-Users Routes
var channelusers = require('./routes/channel-user.routes');
channelusers(app);


// Static Directory for Angular Client Side app
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../client/dist/client/index.html'))
});


// Start HTTP Server
require('./listen')(app, port);