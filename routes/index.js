const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/users');
const { imagePattern } = require('../const/patterns');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(imagePattern),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
