const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
  return jwt.sign({ user_id: user._id }, process.env.SECRET);
};

const signup = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.password = user.generateHash(password);

  user.save((err, user) => {
    if (err) {
      return res.status(422).send(err.errors);
    }

    res.json({ token: generateToken(user) });
  });
};

const signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'You must provide email and password' });
  }

  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).send(err);

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    if (!user.validPassword(password)) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    res.json({ token: generateToken(user) });
  });
};

module.exports = {
  signup,
  signin
};
