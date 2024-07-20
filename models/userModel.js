const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you have to enter name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please provide your password'],
    minlength: [8, 'your password must have more or equal than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
