const Journey = require('../models/journeyModels');

exports.getAllJourneys = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'To Be Implemented'
  });
};

exports.getJourney = (req, res) => {};

exports.createJourney = async (req, res) => {
  try {
    const newJourney = await Journey.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        journey: newJourney
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.updateJourney = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'To Be Implemented'
  });
};

exports.deleteJourney = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'To Be Implemented'
  });
};
