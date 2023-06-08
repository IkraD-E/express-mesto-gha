const router = require('express').Router();
const { createCard, getCards, deleteCard} = require('../controllers/cards');

router.delete('/:cardId', deleteCard);

router.get('/', getCards);

router.post('/', createCard);

module.exports = router;