const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jsfullstackstarter');

const { User } = require('./models');

app.use(bodyParser.json());

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  user.save((err, user) => {
    if (err) {
      res.status(422).send(err.errors);
    }

    res.json(user);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
