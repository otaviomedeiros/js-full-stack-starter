const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (email, callback) => {
        const emailRegex = /.+@.+(\.\w+)+/;
        callback(emailRegex.test(email), `${email} is not a valid email`);
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  }
});

UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
