const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const NOT_FOUND = 404;

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

app.use((req, res, next) => {
  req.user = {
    _id: '6481641fca75cc32d843385c',
  };
  next();
});

app.use(express.json());

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  res.status(NOT_FOUND).send('Страница не найдена. Ошибка 404');
  next();
});

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
