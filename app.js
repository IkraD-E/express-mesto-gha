const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

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

app.use((req, res, next) => {
  req.user = {
    _id: '6488a52bc8ad2a77dab0c525',
  };
  next();
});

app.use(express.json());

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use((req, res) => {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
