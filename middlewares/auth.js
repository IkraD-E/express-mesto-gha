const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    return handleAuthError(res);
  }

  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(err);
  }
  console.log(payload);
  req.user = payload;

  next();
};

module.exports = auth;
