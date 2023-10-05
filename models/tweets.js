const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  text: String,
  like: Number,
  date: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;