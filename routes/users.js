const router = require('express').Router();
const { getUser, createUser, getUserById } = require('../controllers/users');

router.get('/users', getUser);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

module.exports = router;
