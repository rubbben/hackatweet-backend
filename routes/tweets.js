var express = require('express');
var router = express.Router();
let Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');

// Création d'un nouveau tweet
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

// Récupération des 5 derniers tweets (ie les 5 plus récents)
router.get('/lasttweets', function(req, res) {
  Tweet.find().populate('userId').sort({date: -1}).limit(5).then(data => {
    res.json(data)
  })
});

// Incrémentation du nb de like d'un tweet
router.post('/like', function(req, res) {
  Tweet.updateOne({_id: req.body._id}, { $inc: { like: 1 }})
       .then(data => res.json(data))
});

// Suppression d'un tweet
router.delete('/delete', function(req, res) {
  Tweet.deleteOne({_id: req.body._id})
       .then(data => res.json(data))  
});

module.exports = router;
