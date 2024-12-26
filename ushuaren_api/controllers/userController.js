const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apifeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(User.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const users = await features.query;

const users= await User.find()

  res.status(200).json({
    status: 'sccuess',
    results: users.length,
    data: {
      users,
    },
  });
});

// exports.getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };

//POST METHOD : create new
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body); //await because it is from net returns promise

  res.status(200).json({
    status: 'success',
    data: {
      User: newUser,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No category found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user, // category： category in ES6, category can be shortened to only category as key value pair has the same name
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await Category.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No category found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
