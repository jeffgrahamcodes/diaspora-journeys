const express = require('express');

const {
  getAllJourneys,
  createJourney,
  getJourney,
  updateJourney,
  deleteJourney,
} = require('../controllers/journeyControllers');

const router = express.Router();

router.route('/').get(getAllJourneys).post(createJourney);

router
  .route('/:id')
  .get(getJourney)
  .patch(updateJourney)
  .delete(deleteJourney);

module.exports = router;
