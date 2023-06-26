const errorHandler = (err, req, res, next) => {
  const errMessage = err.message || 'На сервере произошла ошибка';

  const errStatus = err.statusCode || 500;

  res.status(errStatus || 500).send({ message: errMessage } || '');
  next();
};

module.exports = errorHandler;
