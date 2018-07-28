const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use('/', (req, res, next) => {
    //console.log(req.path);
    //ignore .js & .ico paths
    if(req.path.substring('.js') === -1 && req.path.substring('.ico') === -1 && req.path !== '/users/login' && req.path !== '/users/register' && req.path !== '/users/current') {
        //get auth header
        const token = req.get('Authorization');
        console.log(token);
    }
    next();
});

module.exports = router;