const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signupJoi, signinJoi } = require('../utils/requestValidate');

router.use('/signup', celebrate(signupJoi), createUser);
router.use('/signin', celebrate(signinJoi), login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
