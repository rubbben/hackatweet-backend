const mongoose = require('mongoose');

const hastagSchema = mongoose.Schema({
  text: String,
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }]
});

const Hashtag = mongoose.model('hashtags', hastagSchema);

module.exports = Hashtag;