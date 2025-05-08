const Journey = require('../models/journeyModels');

exports.getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find();

    res.status(200).json({
      status: 'success',
      results: journeys.length,
      data: {
        journeys
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
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
