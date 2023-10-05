var express = require('express');
var router = express.Router();
let Hashtag = require('../models/hashtags')


router.post('/add', function(req, res) {
  
  //Verification hashtag non existant
  Hashtag.findOne({ text: req.body.text }).then(data => {

    if (data === null) {
      //Creation nouvel hashtag
      let newHashtag = new Hashtag({
        text: req.body.text,
        tweetsIds: [req.body.tweetId],
      });

      newHashtag.save().then(data => {
        res.json({ result: true, data })
      });
    } else {
      //Hashtag deja existant dans la BDD
      Hashtag.updateOne({text: req.body.text}, {$push: { tweetsIds: req.body.tweetId }}).then(data => {
        res.json({result: true, data })
      });
    }

  });

});




//Recupere tout les tweets du hashtag concerné
router.get('/:namehashtag', function(req, res) {
  console.log(req.params.namehashtag);
  Hashtag.findOne({text: req.params.namehashtag}).populate('tweetsIds').then(data => {
    res.json(data)
  })
});

module.exports = router;
