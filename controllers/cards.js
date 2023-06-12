const Card = require('../models/card');

const BAD_REQUEST_ERR = 400;
const DEFAULT_ERR = 500;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(DEFAULT_ERR).send({ message: err.massage });
      }
    });
};
