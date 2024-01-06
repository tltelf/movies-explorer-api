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

async function main() {
  try {
    await mongoose.connect(config.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
}

main().catch((err) => console.log(err));

app.use(requestLogger);
app.use(limiter);

app.use(cors(config.allowedCors));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(config.PORT);
