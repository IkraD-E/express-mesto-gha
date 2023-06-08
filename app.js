const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const BASE_URL = 'mongodb://localhost:27017/mestodb';

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
    _id: "6481641fca75cc32d843385c"
  }
  next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routerUsers);
app.use('/cards', routerCards);


app.listen(PORT, () => {
  console.log(`Слушаем порт: ${PORT}`);
});
