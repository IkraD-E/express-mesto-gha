const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerIndex = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const BASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log(`Успешно подключен к серверу: ${BASE_URL}`);
  })
  .catch(() => {
    console.log(`Провалено подключение к серверу: ${BASE_URL}`);
  });

app.use(express.json());

app.use(cookieParser());
app.use('/', routerIndex);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена. Где вы взяли на неё ссылку?'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
