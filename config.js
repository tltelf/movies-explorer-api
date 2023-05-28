require('dotenv').config();

const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  URL,
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  URL,
  allowedCors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'authorization'],
  },
};
