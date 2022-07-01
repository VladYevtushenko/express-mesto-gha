const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { urlValidation } = require('./utils/urlValidation');
const NotFoundError = require('./errors/notFoundError');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(express.json());

app.post(
  './signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(urlValidation),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errors());
app.use('*', (req, res, next) => next(
  new NotFoundError('Ресурс не найден'),
));

app.use(handleErrors);

app.listen(PORT, () => {
  // Если работает
  // eslint-disable-next-line no-console
  console.log(`server launched at: ${PORT}`);
});
