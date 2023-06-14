const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { updProfileJoi } = require('../utils/requestValidate');

const { getUserInfo, updateUserInfo } = require('../controllers/users');

usersRouter.get('/me', getUserInfo);

usersRouter.patch('/me', celebrate(updProfileJoi), updateUserInfo);

module.exports = usersRouter;
