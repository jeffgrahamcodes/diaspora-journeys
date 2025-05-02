const fs = require('fs');

const journeys = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/journeys-simple.json`)
);

const findJourneyById = (id) =>
  journeys.find((journey) => journey.id === parseInt(id));

exports.checkId = (req, res, next, val) => {
  console.log(`Journey id is: ${val}`);

  const journey = findJourneyById(val);

  if (!journey) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

exports.getAllJourneys = (req, res) => {
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
  const journey = findJourneyById(req.params.id);

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
  res.status(200).json({
    status: 'success',
    data: 'updatedTour',
  });
};

exports.deleteJourney = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
