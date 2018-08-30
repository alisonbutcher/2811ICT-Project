const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./routes/auth.js')(app,fs);
require('./routes/register.js')(app,fs);
require('./listen.js')(http);