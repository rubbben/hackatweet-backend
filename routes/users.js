var express = require('express');
var router = express.Router();
let User = require('../models/users')

/* GET users listing. */
router.post('/signup', function(req, res) {
  res.send('USER');

  let newUser = new User({
    firstname: req.body.firstname,
    username: req.body.username,
    password: req.body.password,
    token: Math.floor(Math.random() * 32),
  })

  newUser.save().then( data => console.log(data) )

});

module.exports = router;
