const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  createUser,
  getUserById,
  updateUserData,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.post('/signup', createUser);

router.post('/signin', login);

router.use(auth);

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.patch('/me', updateUserData);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
