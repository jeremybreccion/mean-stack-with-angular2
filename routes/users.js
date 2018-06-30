
const express = require('express');
const router = express.Router();
const mongoskin = require('mongoskin');
const url = require('../config/database.json');
const db = mongoskin.db(url.database, { useNewUrlParser: true });
const bcrypt = require('bcryptjs');
db.bind('users');


router.post('/register', (req, res) => {
    console.log(req.body);
    //hash the password
    req.body.password = bcrypt.hashSync(req.body.password);
    console.log(req.body);
    db.users.insert(req.body, (err) => {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send();
        }
    });

});

module.exports = router;

