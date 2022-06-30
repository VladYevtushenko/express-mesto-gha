const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../utils/errors');

const { inputsError } = require('../utils/inputsError');

// login

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res
        .status(200)
        .send({ message: 'Вы вошли' });
    })
    .catch(() => next(new Error('Указаны неправильные почта или пароль')));
};

// GET lookup user

module.exports.getUser = (req, res, next) => User
  .findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new Error('Пользователь с таким id не найден');
    }
    res
      .status(200)
      .send(user);
  })
  .catch(next);

// GET lookup all users

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: `${INTERNAL_SERVER_ERROR}: Ошибка сервера` }));
};

// GET lookup user by ID

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST)
          .send({ message: 'Отправлен неврный _id пользователя' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR}: Ошибка сервера` });
    });
};

// POST create user

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Переданы некорректные данные при создании пользователя, неверно указаны данные в полях: ${inputsError(err)}`,
          });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR}: Ошибка сервера` });
    });
};

// PATCH user info editing

module.exports.editUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Переданы некорректные данные при изменении данных пользователя, неверно указаны данные в полях: ${inputsError(err)}`,
          });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR}: Ошибка сервера` });
    });
};

// PATCH user's ava editing

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: `Переданы некорректные данные при изменении данных пользователя, неверно указаны данные в полях: ${inputsError(err)}`,
          });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR}: Ошибка сервера` });
    });
};
