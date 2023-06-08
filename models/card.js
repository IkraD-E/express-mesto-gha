const mongoose = require('mongoose');

const cardShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  owner: {
    type: ObjectId,
    required: true
  },
  likes: {
    type: Array,
    required: true,
    default: {}
  }
});

module.exports = mongoose.model('card', cardShema);