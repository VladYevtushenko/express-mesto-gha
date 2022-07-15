const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/unauthorisedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt || res.token;
  if (!token) {
    next(new UnauthorisedError('Ошибка авторизации 321'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (error) {
    next(new UnauthorisedError('Ошибка авторизации 123'));
    return;
  }
  req.user = payload;
  next();
};
