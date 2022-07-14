const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/unauthorisedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorisedError('Ошибка авторизации'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (error) {
    next(new UnauthorisedError('Ошибка авторизации'));
    return;
  }
  req.user = payload;
  next();
};
