const User = require('../models/user');

const BAD_REQUEST_ERR = 400;
const DEFAULT_ERR = 500;

const opts = {
  new: true,
  runValidators: true,
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.updateUserName = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name }, opts)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, opts)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};
