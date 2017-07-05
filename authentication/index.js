const AuthenticationController = require('./auth_controller');
const { passport, authenticate } = require('./passport');

module.exports = {
  AuthenticationController,
  passport,
  authenticate
};
