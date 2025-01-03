const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    validate: {
      validator: function (value) {
        // Only validate the URL if the value is not null
        return value == null || validator.isMobilePhone(value);
      },
      message: 'Please provide a valid phone number ',
    },
    default: null, // Phone is optional but if provided, must be valid
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super', 'developer', 'guest'], // Including various roles
    default: 'user',
  },
  password: {
    type: String,
    default: null,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //validate property; THIS IS ONLY WORK ON SAVE OR INITAL CREATE, NOT UPDATE, SO UPDATE ALSO NEED TO USE SAVE
      validator: function (el) {
        return el === this.password; //refer to password field
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordRestToken: String,
  passwordRestExpires: Date,
  profileImage: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        // Only validate the URL if the value is not null
        return value == null || validator.isURL(value);
      },
      message: 'Please provide a valid URL for the profile image',
    },
  },
  //   address: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Address',
  //     default: null, // Make address optional
  //   },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    defult: null,
    immutable: true, // Prevent changes to this field after creation
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevent changes to this field after creation
  },
});

//encrypt password with bcrypt
userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) return next(); //password not modified, call next middleware
  this.password = await bcrypt.hash(this.password, 12); // 12 is cost parameter, more cpu instensive, regular is 10. salting the password
  this.passwordConfirm = undefined; //delete the confirm password, required for input but not required to be persisted into db
  next();
}); //pre save to db, manipulate password to be hashed
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//implementing password change before token expired or stolen
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // 100 < 200
  }
  //this refers current document, false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
