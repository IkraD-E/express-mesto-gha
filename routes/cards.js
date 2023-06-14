const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

router.delete('/:cardId', deleteCard);

router.get('/', getCards);

router.post('/', createCard);

router.put('/:cardId/likes', addLike);

router.delete('/:cardId/likes', deleteLike);

module.exports = router;
