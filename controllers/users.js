const { default: mongoose } = require("mongoose");

const userShema = new mongoose.Shema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', userShema);