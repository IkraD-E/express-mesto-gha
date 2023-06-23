const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', createUser);

router.post('/signin', login);

module.exports = router;
