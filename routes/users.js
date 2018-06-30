
const express = require('express');
const router = express.Router();
const url = require('../config/database.json');
const mongoose = require('mongoose');
mongoose.connect(url.database);
const models = require('../models/models');
const bcrypt = require('bcryptjs');



router.post('/register', (req, res) => {
    console.log(req.body);
    //hash the password
    req.body.password = bcrypt.hashSync(req.body.password);
    console.log(req.body);

    var newUser = models.User(req.body);

    newUser.save((err) => {
        if(err) {
            res.status(400).send();
        }

        res.status(200).send();
    });

});

module.exports = router;

