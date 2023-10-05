var express = require('express');
var router = express.Router();
// let Hashtag = require('../models/hashtags')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('HASHTAG');
});

module.exports = router;
