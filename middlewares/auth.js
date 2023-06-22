const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

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
    return handleAuthError(res);
  }
  console.log(payload);
  req.user = payload;

  next();
};

module.exports = auth;
