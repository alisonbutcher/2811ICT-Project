const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Static Directory for Angular Client Side app
app.use(express.static(path.join(__dirname, '../client/dist/client')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../client/dist/client/index.html'))
});


// returns an object containing json user, channel and group data
// let data = require('./data/data.js')(fs);

// Routes
require('./routes/api/auth.js')(app,fs);
require('./routes/api/register.js')(app,fs);
require('./routes/api/users.js')(app,fs);
require('./routes/api/groups.js')(app,fs);
require('./routes/api/login.js')(app,fs);
require('./routes/api/channel.js')(app,fs);
require('./routes/api/roles.js')(app,fs);

// Http server
require('./listen.js')(http);
