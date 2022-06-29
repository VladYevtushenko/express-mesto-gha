const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Error('Ошибка авторизации');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret-key');
  } catch (error) {
    next(new Error('Ошибка авторизации'));
  }
  req.user = payload;
  next();
};
