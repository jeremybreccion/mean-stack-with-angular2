const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const port = 8080;
const index = require('./routes/index');

app.use('/', index);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/client/dist/client/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(port, () => {
    console.log('Listening to port 8080');
});