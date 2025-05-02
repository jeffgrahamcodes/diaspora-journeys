const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const journeyRouter = require('./routes/journeyRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const baseApiUrl = '/api/v1';

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  ``;
  console.log('Middleware called');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use(`${baseApiUrl}/journeys`, journeyRouter);
app.use(`${baseApiUrl}/users`, userRouter);

module.exports = app;
