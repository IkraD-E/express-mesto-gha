const User = require('../models/user');

module.exports.createUser  = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500)
      .send({message: `Произошла ошибка создания пользователя: ${err}`}));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500)
      .send({message: `Произошла ошибка при получении всех пользователей: ${err}`}));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(err => res.status(500)
      .send({message: `Произошла ошибка при получении конкретного пользователя: ${err}`}));
};

module.exports.updateUserName = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name })
    .then(user => res.send(user))
    .catch(err => res.status(500)
      .send({message: `Произошла ошибка при обновлении имени пользователя: ${err}`}));
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then(user => res.send(user))
    .catch(err => res.status(500)
      .send({message: `Произошла ошибка при обновлении аватара пользователя: ${err}`}));
};