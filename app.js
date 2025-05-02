const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const baseApiUrl = '/api/v1';
const journeys = JSON.parse(
  fs.readFileSync(`${__dirname}/data/journeys-simple.json`)
);

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Middleware called');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE HANDLERS
const getAllJourneys = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: journeys.length,
    data: {
      journeys,
    },
  });
};

const getJourney = (req, res) => {
  const id = parseInt(req.params.id);

  const journey = journeys.find((journey) => journey.id === id);

  if (!journey) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      journey,
    },
  });
};

const createJourney = (req, res) => {
  const newId = journeys.length;
  const newJourney = Object.assign({ id: newId }, req.body);

  journeys.push(newJourney);
  fs.writeFile(
    `${__dirname}/data/journeys-simple.json`,
    JSON.stringify(journeys),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          journey: newJourney,
        },
      });
    }
  );
};

const updateJourney = (req, res) => {
  const id = parseInt(req.params.id);

  const journey = journeys.find((journey) => journey.id === id);

  if (!journey) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: 'updatedTour',
  });
};

const deleteJourney = (req, res) => {
  const id = parseInt(req.params.id);

  const journey = journeys.find((journey) => journey.id === id);

  if (!journey) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not yet defined',
  });
};

// ROUTES
app
  .route(`${baseApiUrl}/journeys`)
  .get(getAllJourneys)
  .post(createJourney);

app
  .route(`${baseApiUrl}/journeys/:id`)
  .get(getJourney)
  .patch(updateJourney)
  .delete(deleteJourney);

app.route(`${baseApiUrl}/users`).get(getAllUsers).post(createUser);
app
  .route(`${baseApiUrl}/users/:id`)
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
