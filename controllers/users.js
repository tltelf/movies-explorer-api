const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const config = require('../config');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new ConflictError('Неправильный формат почты или почта уже используется'));
      } else {
        next(e);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        config.NODE_ENV === 'production' ? config.JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else {
        next(e);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
