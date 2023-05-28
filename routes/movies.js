const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { createFilmJoi, idJoi } = require('../utils/requestValidate');

const {
  getFilms,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');

const checkFilmOwner = require('../middlewares/checkFilmOwner');

moviesRouter.get('/', getFilms);

moviesRouter.post('/', celebrate(createFilmJoi), createFilm);

moviesRouter.delete('/:_id', celebrate(idJoi), checkFilmOwner, deleteFilm);

module.exports = moviesRouter;
