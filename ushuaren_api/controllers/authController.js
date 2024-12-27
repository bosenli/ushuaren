const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign(
    {
      id: id, // can be repalced with {id}
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.signup = catchAsync(async (req, res, next) => {
  //const newUser = await User.create(req.body); //return a promise - serious security flaw
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // const email = req.body.email;
  const { email, password } = req.body;
  //1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  //2) check if user exists and password is correct
  //   const user = User.findOne({email: email}) //field and email
  const user = await User.findOne({ email }).select('+password'); //add password back from the model where it is hided set to false
  console.log(user);
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError('Incorrect email or password ', 401));
  }

  //3) if everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

//protecting ROUTES only for login users
exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check of if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in ! Please log in to get access.', 401)
    );
  }

  //2) Verfication: Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);
  //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The token beloning to this user does no longer exits', 401)
    );
  }
  //4) Check if user chenage password after the JWT token was issued-in model
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  req.user = currentUser;

  next(); //if all goes all, access to protected route
});

//categoryRouter restrict to  middleware, no arugment pass in into middleware, wrapper function, and return middle ware function
exports.restrictTo = (...roles) => {
  //...roles is rest parameter syntax, array of all argument specify
  //return middle ware function itself , this function will access the roles because there is closure, roles is an array
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on Posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }

  //2) Generate the random rest token
  const resetToken = user.createPasswordRestToken();
  await user.save();
  //3) send it to user's email
});

exports.resetPassword = (req, res, next) => {};
