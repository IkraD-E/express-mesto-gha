const router = require('express').Router();
const createCard = require('../controllers/cards');

// router.get('/users', getCard);

// router.delete('/users/:userId', deleteCard);

router.post('/cards', createCard);

module.exports = router;