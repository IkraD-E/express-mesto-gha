const User = require('../models/user');

const BAD_REQUEST_ERR = 400;
const NOT_FOUND = 404;
const DEFAULT_ERR = 500;

const opts = {
  new: true,
  runValidators: true,
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res
          .status(DEFAULT_ERR)
          .send('Произошла ошибка на сервере');
      }
      console.log({
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res
        .status(DEFAULT_ERR)
        .send({
          message: 'Произошла ошибка на сервере',
        });
      console.log({
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(NOT_FOUND)
          .send({
            message: 'Пользователь не существует',
          });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST_ERR)
          .send({
            message: 'Пользователь не найден',
          });
      } else {
        res.status(DEFAULT_ERR)
          .send({
            message: 'Произошла ошибка на сервере',
          });
        console.log({
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports.updateUserData = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, opts)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST_ERR)
          .send({
            message: 'Переданы некорректные данные',
          });
      } else {
        res
          .status(DEFAULT_ERR)
          .send({
            message: 'Произошла ошибка на сервере',
          });
      }
      console.log({
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, opts)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST_ERR)
          .send({
            message: 'Переданы некорректные данные',
          });
      } else {
        res
          .status(DEFAULT_ERR)
          .send({
            message: 'Произошла ошибка на сервере',
          });
      }
      console.log({
        err: err.message,
        stack: err.stack,
      });
    });
};
