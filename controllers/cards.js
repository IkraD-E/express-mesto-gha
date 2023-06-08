const Card = require('../models/card');
const router = require('express').Router();

module.exports.createCard = router.post('/', (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err}`}));
});