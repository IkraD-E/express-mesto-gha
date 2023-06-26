const jwt = require('jsonwebtoken');
const IncorrectData = require('../errors/IncorrectData');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    return next(new IncorrectData('Зайдите в ваш аккаунт'));
  }

  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new IncorrectData('Получите новую куку'));
  }
  req.user = payload;

  next();
};

module.exports = auth;
