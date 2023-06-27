const Card = require('../models/card');
const MissiedData = require('../errors/MissiedData');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .orFail(() => next(new NotFound('Карточка не найдена')))
    .populate(['owner'])
    .then((card) => {
      if (!(req.user._id === String(card.owner._id))) {
        next(new MissiedData('Эта карточка принадлежит другому пользователю'));
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.addLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => next(new NotFound('Карточка не найдена')))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => next(new NotFound('Карточка не найдена')))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};
