const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

const INCORRECT_DATA = 401;
const MISSED_DATA = 403;

const opts = {
  new: true,
  runValidators: true,
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .select('+password')
    .orFail(() => new NotFound('Not found'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, opts)
    .select('+password')
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, opts)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then(
      (hashedPassword) => {
        User.create({
          ...req.body,
          password: hashedPassword,
        })
          .then((user) => res.status(201).send({ data: user }))
          .catch((next));
      },
    )
    .catch((next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(MISSED_DATA)
      .send({
        message: 'введите логин и пароль',
      });
    return;
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => new BadRequest('Пользователь не найден'))
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
    .catch(next);
};
