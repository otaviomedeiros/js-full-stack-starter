const { User } = require('../user');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const jwtStrategy = (jwt_payload, done) => {
  const user = User.findOne({ _id: jwt_payload.user_id }, (err, user) => {
    if (err) {
      done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

module.exports = new Strategy(jwtOptions, jwtStrategy);
