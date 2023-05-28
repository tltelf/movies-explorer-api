const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const user = require('./user');

const movieSchema = mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(image) {
        return isURL(image);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator(trailerLink) {
        return isURL(trailerLink);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator(thumbnail) {
        return isURL(thumbnail);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
