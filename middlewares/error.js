const BAD_REQUEST_ERR = 400;
// const INCORRECT_DATA = 401;
// const MISSED_DATA = 403;
const NOT_FOUND = 404;
const DEFAULT_ERR = 500;
const EMAIL_ALREADY_IN_DB = 409;

class NewError extends Error {
  constructor(err, statusCode, message) {
    super(err);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  let error;
  switch (String(err.name)) {
    case 'Not found':
      error = new NewError(err, NOT_FOUND, 'Пользователь не существует');
      break;
    case 'CastError':
      error = new NewError(err, BAD_REQUEST_ERR, 'Пользователь не найден');
      break;
    case 'ValidationError':
      error = new NewError(err, BAD_REQUEST_ERR, 'Переданы некорректные данные');
      break;
    case 'MongoServerError':
      if (err.code === 11000) {
        error = new NewError(err, EMAIL_ALREADY_IN_DB, 'Пользователь с этой почтой уже зарегестрирован');
      }
      break;
    default: {
      error = new NewError(err, DEFAULT_ERR, 'Произошла ошибка на сервере');
    }
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
