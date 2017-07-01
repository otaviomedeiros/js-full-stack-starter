const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jsfullstackstarter');

app.get('/', (req, res) => {
  res.send('JS full stack starter');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
