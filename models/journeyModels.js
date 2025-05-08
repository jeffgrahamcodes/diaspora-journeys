const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Journey must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Journey must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;
