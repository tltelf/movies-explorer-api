const jwt = require('jsonwebtoken');
const config = require('../config');
const AuthError = require('../errors/UnauthorizedError');
const { unAuthorized } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(unAuthorized));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.NODE_ENV === 'production' ? config.JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new AuthError(unAuthorized));
    return;
  }
  req.user = payload;
  next();
};
