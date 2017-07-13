require('dotenv').config();
require('./db');
const { passport, authenticate } = require('./passport');

module.exports = {
  passport,
  authenticate
}
