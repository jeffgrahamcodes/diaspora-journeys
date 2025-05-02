const express = require('express');

const {
  getAllJourneys,
  createJourney,
  getJourney,
  updateJourney,
  deleteJourney,
  checkId,
  checkBody,
} = require('../controllers/journeyControllers');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllJourneys).post(checkBody, createJourney);

router.route('/:id').get(getJourney).patch(updateJourney).delete(deleteJourney);

module.exports = router;
