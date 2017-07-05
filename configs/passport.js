const passport = require('passport');
const strategy = require('./passport_strategy');

passport.use(strategy);

const authenticate = function(){
  return passport.authenticate('jwt', { session: false });
}

module.exports = {
  passport,
  authenticate
}
