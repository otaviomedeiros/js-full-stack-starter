const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthenticationController = require('./controllers/auth_controller');
const IndexController = require('./controllers/index_controller');
require('./db');

const { User } = require('./models');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const strategy = new Strategy(jwtOptions, (jwt_payload, next) => {
  const user = User.findOne({ _id: jwt_payload.uer_id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
app.use(passport.initialize());


app.use(bodyParser.json());

const authenticate = function(){
  return passport.authenticate('jwt', { session: false });
}

app.get(
  '/',
  authenticate(),
  IndexController.index
);
app.post('/api/signup', AuthenticationController.signup);
app.post('/api/signin', AuthenticationController.signin);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
