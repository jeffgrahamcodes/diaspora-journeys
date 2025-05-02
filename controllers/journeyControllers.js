const fs = require('fs');

const journeys = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/journeys-simple.json`)
);

exports.getAllJourneys = (req, res) => {
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

exports.getJourney = (req, res) => {
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

exports.createJourney = (req, res) => {
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

exports.updateJourney = (req, res) => {
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

exports.deleteJourney = (req, res) => {
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
