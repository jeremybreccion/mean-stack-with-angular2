const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const port = 8080;
const index = require('./routes/index');
const users = require('./routes/users');
const config = require('./config/config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: config.session_secret, resave: false, saveUninitialized: true}));

//put route declarations here
app.use('/', index);
app.use('/users', users);



app.use(express.static(__dirname + '/client/dist/client/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(port, () => {
    console.log('Listening to port 8080');
});