var express = require('express');
var router = express.Router();
let Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');

/* GET users listing. */
router.post('/new', function(req, res) {
    if (!checkBody(req.body, ['text'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    let newTweet = new Tweet({
        text: req.body.text,
        like: 0,
        date: Date.now(),
        userId: req.body.userId,
    });

    newTweet.save().then(data => {
        res.json({ result: true, _id: data._id })
    });

});

router.get('/lasttweets', function(req, res) {
  Tweet.find().sort({date: -1}).limit(5).then(data => {
    res.json(data)
  })
});

router.post('/like', function(req, res) {
  
});

router.delete('/delete', function(req, res) {
  
});

module.exports = router;
