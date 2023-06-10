const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUserName,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', updateUserName);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
