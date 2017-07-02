const jwt = require('jsonwebtoken');
const { User } = require('../models');

const signup = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  user.save((err, user) => {
    if (err) {
      res.status(422).send(err.errors);
    }

    res.json({ token: jwt.sign({ user_id: user._id }, process.env.SECRET) });
  });
};

module.exports = {
  signup
};
