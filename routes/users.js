var express = require('express');
var router = express.Router();
let User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');



router.post('/signup', function(req, res) {
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    //Verification utilisateur non existant
    User.findOne({ username: req.body.username }).then(data => {
      if (data === null) {
        //Creation nouvel utilisateur
        const hash = bcrypt.hashSync(req.body.password, 10);

        let newUser = new User({
          firstname: req.body.firstname,
          username: req.body.username,
          password: hash,
          token: uid2(32),
        })

        newUser.save().then(data => {
          res.json({ result: true, token: data.token, _id: data._id })
        })
      } else {
        //Utilisateur deja existant dans la BDD
        res.json({ result: false, error: 'User already exists' });
      }

    });

});

router.post('/signin', function(req, res) {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, _id: data._id });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

module.exports = router;
