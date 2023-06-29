const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/NotFound');
const AuthError = require('../errors/AuthError');
const UserDublication = require('../errors/UserDublication');
const BadRequest = require('../errors/BadRequest');

const opts = {
  new: true,
  runValidators: true,
};

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User
    .findById(req.params.userId)
    .orFail(() => next(new NotFound('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => next(new NotFound('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, opts)
    .orFail(() => next(new NotFound('Пользователь не найден')))
    .select('+password')
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, opts)
    .orFail(() => next(new NotFound('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(String(req.body.password), 10)
    .then(
      (hashedPassword) => {
        User
          .create({
            ...req.body,
            password: hashedPassword,
          })
          .then((user) => res.status(201).send({ data: user }))
          .catch((err) => {
            if (err.code === 11000) {
              next(new UserDublication('Пользователь с этой почтой уже зарегестрирован'));
            } else if (err.name === 'ValidationError') {
              next(new BadRequest('Переданы некорректные данные при регистрации'));
            } else {
              next(err);
            }
          });
      },
    )
    .catch((next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email })
    .select('+password')
    .orFail(() => next(new AuthError('Пользователь не найден')))
    .then((user) => {
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
            res.send({ data: user.toJSON() });
          } else {
            next(new AuthError('Неправильный логин или пароль'));
          }
        });
    })
    .catch(next);
};
