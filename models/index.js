const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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

UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
