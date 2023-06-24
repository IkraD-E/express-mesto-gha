const mongoose = require('mongoose');

const cardShema = new mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: Array(mongoose.Schema.Types.ObjectId),
    ref: 'user',
    default: [],
  },
});

module.exports = mongoose.model('card', cardShema);
