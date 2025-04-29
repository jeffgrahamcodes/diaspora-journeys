const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const journeys = JSON.parse(
  fs.readFileSync(`${__dirname}/data/journeys-simple.json`)
);

const baseApiUrl = '/api/v1/journeys';

const getAllJourneys = (req, res) => {
  res.status(200).json({
    status: 'success',
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

app.route(baseApiUrl).get(getAllJourneys).post(createJourney);

app
  .route(`${baseApiUrl}/:id`)
  .get(getJourney)
  .patch(updateJourney)
  .delete(deleteJourney);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
