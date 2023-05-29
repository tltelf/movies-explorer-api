const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes');
const config = require('./config');
const errorsHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);

app.use(cors(config.allowedCors));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(config.PORT);
