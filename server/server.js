var express = require('express'),
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
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/2811ICT'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/user.routes'); //importing route
routes(app); //register the route

var groups = require('./routes/group.routes');
groups(app);

var channels = require('./routes/channel.routes');
channels(app);

var roles = require('./routes/role.routes');
roles(app);


var userroles = require('./routes/user-role.routes');
userroles(app);

var groupchannels = require('./routes/group-channel.routes');
groupchannels(app);

var groupusers = require('./routes/group-user.routes');
groupusers(app);

var channelusers = require('./routes/channel-user.routes');
channelusers(app);
// // Static Directory for Angular Client Side app
// app.use(express.static(path.join(__dirname, '../client/dist/client')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'../client/dist/client/index.html'))
// });


app.listen(port);


console.log('RESTful API server started on: ' + port);


// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const fs = require('fs');
// const cors = require('cors');
// const bodyparser = require('body-parser');
// const path = require('path');
// const mongoose = require('mongoose');


// // Connection to DB via mongoose
// let databaseUrl = 'mongodb://localhost/2811ICT';
// // let mongoDB = process.env.MONGODB_URI || databaseUrl;
// let mongoDB = databaseUrl;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind.bind(console, 'MongoDB connection error:'));

// // Setup Body Parser
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());

// // Static Directory for Angular Client Side app
// app.use(express.static(path.join(__dirname, '../client/dist/client')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'../client/dist/client/index.html'))
// });


// // returns an object containing json user, channel and group data
// // let data = require('./data/data.js')(fs);

// // Routes
// // require('./routes/api/auth.js')(app,fs);
// // require('./routes/api/register.js')(app,fs);
// // // require('./routes/api/users.js')(app,fs);
// // import routes from './routes/userRoutes';

// //app.js

// const user = require('./routes/userRoutes'); // Imports routes for the user
// app.use('/user', user);


// // require('./routes/userRoutes.js')(app);
// require('./routes/api/groups.js')(app,fs);
// require('./routes/api/login.js')(app,fs);
// require('./routes/api/channel.js')(app,fs);
// require('./routes/api/roles.js')(app,fs);

// // Http server
// require('./listen.js')(http);
