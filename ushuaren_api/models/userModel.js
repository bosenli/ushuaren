const mongoose = require('mongoose');
const validator = require('validator');
const Address = require('./addressModel'); // Assuming you have an Address model as discussed

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'],
    default: null, // Phone is optional but if provided, must be valid
  },
  password: {
    type: String,
    default: null,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfrim: {
    type: String,
    required: [true, 'Please  confirm your password'],
    default: null,
  },
  profileImage: {
    type: String,
    validate: [
      validator.isURL,
      'Please provide a valid URL for the profile image',
    ],
    default: '',
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    default: null, // Make address optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevent changes to this field after creation
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super', 'developer', 'guest'], // Including various roles
    default: 'user',
  },
  // Other fields for authentication like password, etc., could be added here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
