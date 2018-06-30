
const express = require('express');
const router = express.Router();
const config = require('../config/config.json');
const mongoose = require('mongoose');
mongoose.connect(config.database);
const models = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', (req, res) => {
    //hash the password
    req.body.password = bcrypt.hashSync(req.body.password);

    const newUser = models.User(req.body);

    newUser.save((err) => {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        }

        res.status(200).send();
    });
});

router.post('/login', (req, res) => {
    models.User.findOne({ email: req.body.email }, (err, aUser) => {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        //compare passwords here
        } else if(aUser && bcrypt.compareSync(req.body.password, aUser.password)) {
            //to manipulate results from mongoose, it must be converted to an object
            /* aUser = aUser.toObject();
            delete aUser.password; */
            //generate jwt token
            const token = jwt.sign({ userId: aUser._id }, config.token_secret, { expiresIn: config.token_expiration });
            res.status(200).send({ user: aUser, token: token });
        } else {
            //incorrect input
            console.log('username/password incorrect');
            res.status(400).send({ AUTH_FAIL: true });
        }
    });
});

module.exports = router;

