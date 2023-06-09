const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: `Произошла ошибка при создании карточки: ${err}`}));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: `Произошла ошибка при получении карточек: ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: `Произошла ошибка при удалении карточки: ${err}` }));
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: `Произошла ошибка при добавлении лайка: ${err}` }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: `Произошла ошибка при добавлении лайка: ${err}` }));
};