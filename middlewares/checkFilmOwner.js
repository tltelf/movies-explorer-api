const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const { notFoundFilm, incorrectData, delOwnMovies } = require('../constants/constants');

module.exports = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params._id);
    if (movie === null) {
      throw new NotFoundError(notFoundFilm);
    }
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new BadRequestError(incorrectData));
      return;
    }
    next(e);
    return;
  }
  if (movie.owner.toString() !== req.user._id) {
    next(new ForbiddenError(delOwnMovies));
  } else {
    next();
  }
};
