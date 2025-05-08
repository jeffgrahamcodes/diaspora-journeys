const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './.env'
});

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'));

const journeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Journey must have a name'],
    unique: true
  },
  price: {
    type: Number,
    req: [true, 'Journey must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

const Journey = mongoose.model('Journey', journeySchema);

const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
