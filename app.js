const fs = require('fs');
const express = require('express');

const app = express();

const beaches = JSON.parse(
  fs.readFileSync(`${__dirname}/data/beaches-simple.json`)
);

app.get('/api/v1/beaches', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: beaches.length,
    data: {
      beaches,
    },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
