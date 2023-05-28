const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');

const getFilms = (req, res, next) => {
  const filmsOwner = req.user._id;
  Movie.find({ owner: filmsOwner })
    .then((films) => res.send(films))
    .catch(next);
};

const createFilm = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((film) => res.send(film))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
        return;
      }
      next(e);
    });
};

const deleteFilm = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .then(() => res.send({ message: 'Фильм удалён' }))
    .catch(next);
};

module.exports = {
  getFilms,
  createFilm,
  deleteFilm,
};
