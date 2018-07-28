
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
            //generate jwt token
            const token = jwt.sign({ userId: aUser._id }, config.token_secret, { expiresIn: config.token_expiration });

            //to manipulate results from mongoose, it must be converted to an object
            aUser = aUser.toObject();
            //delete password & id 
            delete aUser.password, aUser._id;
            //aUser must only have email & nickname
            req.session.user = aUser;
            req.session.token = token;

            res.status(200).send({ user: aUser, token: token });
        } else {
            //incorrect input
            console.log('username/password incorrect');
            res.status(400).send({ AUTH_FAIL: true });
        }
    });
});

router.get('/current', (req, res) => {
    console.log('getting user');
    console.log(req.session.user);
    if(req.session.user) {
        res.status(200).send({user: req.session.user, token: req.session.token});
    } else {
        console.log('no session');
        res.status(400).send();
    }
});

router.get('/logout', (req, res) => {
    console.log('logging out');
    delete req.session.user, req.session.token;
    res.status(200).send();
});

module.exports = router;

