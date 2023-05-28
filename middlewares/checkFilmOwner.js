const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params._id);
    if (movie === null) {
      throw new NotFoundError('Фильм с указанным _id не найден');
    }
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные для удаления фильма'));
      return;
    }
    next(e);
    return;
  }
  if (movie.owner.toString() !== req.user._id) {
    next(new ForbiddenError('Вы можете удалять только собственные фильмы'));
  } else {
    next();
  }
};
