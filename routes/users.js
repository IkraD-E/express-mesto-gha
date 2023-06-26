const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/users');
const { imagePattern } = require('../const/patterns');

router.use(auth);

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), updateUserData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(imagePattern),
  }),
}), updateUserAvatar);

module.exports = router;
