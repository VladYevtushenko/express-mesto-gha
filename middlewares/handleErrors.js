const {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = require('../utils/errors');

module.exports = (err, req, res, next) => {
  const { codeStatus = INTERNAL_SERVER_ERROR, message } = err;

  if (err.code === 11000) {
    res
      .status(CONFLICT)
      .send({ message: 'Email уже используется' });
  } else if (err.name === 'CastError') {
    res
      .status(BAD_REQUEST)
      .send({ message: 'Передан неверный Id' });
  } else if (err.name === 'ValidationError') {
    res
      .status(BAD_REQUEST)
      .send({ message: 'Переданы неверные данные' });
  } else {
    res
      .status(codeStatus)
      .send(codeStatus === INTERNAL_SERVER_ERROR
        ? { message: 'Ошибка сервера' }
        : { message });
    next();
  }
};
