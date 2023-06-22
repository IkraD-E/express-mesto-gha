const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BAD_REQUEST_ERR = 400;
const INCORRECT_DATA = 401;
const NOT_FOUND = 404;
const DEFAULT_ERR = 500;

const opts = {
  new: true,
  runValidators: true,
};

module.exports.createUser = (req, res) => {
  if (validator.isEmail(req.body.email)) {
    bcrypt.hash(String(req.body.password), 10)
      .then(
        (hashedPassword) => {
          User.create({
            ...req.body,
            password: hashedPassword,
          })
            .then((user) => res.status(201).send({ data: user }))
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
                  .send('Произошла ошибка на сервере');
              }
              console.log({
                err: err.message,
                stack: err.stack,
              });
            });
        },
      );
  } else {
    res
      .status(BAD_REQUEST_ERR)
      .send({
        message: 'Передана некорректная почта',
      });
  }
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
  User.findById(req.user._id)
    .select('+password')
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
    .select('+password')
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
    .then((user) => {
      console.log(user);
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign(
              { _id: user._id },
              'some-secret-key',
              { expiresIn: '7d' },
            );
            res.cookie('jwt', token, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ token });
          } else {
            res
              .status(INCORRECT_DATA)
              .send({
                message: 'Неправильный логин или пароль',
              });
          }
        });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
