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

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;
