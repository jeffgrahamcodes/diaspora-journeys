const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const journeys = JSON.parse(
  fs.readFileSync(`${__dirname}/data/journeys-simple.json`)
);

const baseApiUrl = '/api/v1/journeys';

app.get(`${baseApiUrl}`, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: journeys.length,
    data: {
      journeys,
    },
  });
});

app.get(`${baseApiUrl}/:id`, (req, res) => {
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
});

app.post(`${baseApiUrl}`, (req, res) => {
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
});

app.patch(`${baseApiUrl}/:id`, (req, res) => {
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
});

app.delete(`${baseApiUrl}/:id`, (req, res) => {
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
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
