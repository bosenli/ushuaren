const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.signup = catchAsync(async (req, res, next) => {
  //const newUser = await User.create(req.body); //return a promise - serious security flaw
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
