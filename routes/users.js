const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.patch('/me', updateUserData);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
