const { Joi, Segments } = require("celebrate");
const { regExpUrl } = require("../constants/constants");

const signupJoi = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const signinJoi = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const createFilmJoi = {
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpUrl),
    trailerLink: Joi.string().required().pattern(regExpUrl),
    thumbnail: Joi.string().required().pattern(regExpUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const idJoi = {
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
};

const updProfileJoi = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports = {
  signupJoi,
  signinJoi,
  createFilmJoi,
  idJoi,
  updProfileJoi,
};
