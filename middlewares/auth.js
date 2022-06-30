const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Error('');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'secret-key');
  } catch (error) {
    next(new Error('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
