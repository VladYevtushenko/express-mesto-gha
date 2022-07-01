const { INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send(statusCode === INTERNAL_SERVER_ERROR
      ? { message: 'Ошибка сервера' }
      : { message });
  next();
};
