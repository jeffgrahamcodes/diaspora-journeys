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

exports.getJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        journey
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

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

exports.updateJourney = async (req, res) => {
  try {
    const updatedJourney = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        journey: updatedJourney
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.deleteJourney = async (req, res) => {
  try {
    await Journey.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};
