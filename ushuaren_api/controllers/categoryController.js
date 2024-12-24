const Category = require('./../models/categoryModel');
const APIFeatures = require('./../utils/apifeatures');
const AppError = require('./../utils/appError');

const catchAsync = require('./../utils/catchAsync');
//EXPORTS ALL HANDLERS FOR ROUTES which is to categoryRouter
// exports.checkID = (req, res, next, val) => {
//   console.log(`id in controller ${val}`);
//   if (req.params.id * 1 < 0) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };
//TOP five middleware filter example, prefilter example
exports.aliasTopCategory = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-name,description';
  req.query.fields = 'name, description';
  next();
};

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Category.find(), req.query) //mongose query, and req query
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const categories = await features.query;

  res.status(200).json({
    status: 'sccuess',
    results: categories.length,
    data: {
      categories,
    },
  });
  //   try {
  // } catch (err) {
  //   res.status(404).json({
  //     stauts: 'failed',
  //     message: err,
  //   });
  // }
});
//--------------------------------
//GET METHOD : get category commented because it is shorten to a class (apiFeatures.js class)
// exports.getAllCategories = async (req, res) => {
//   try {
//     // let query = Category.find(); // No conditions

//     const queryObj = { ...req.query }; //filter function
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach(el => delete queryObj[el]);

//     // 2) Advance filtering
//     let queryStr = JSON.stringify(queryObj);
//     //console.log('query str ', queryStr);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//     //gte, gt, lte, lt
//     let query = Category.find(JSON.parse(queryStr)); //filter function

//     // 3)Sorting
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(',').join(' '); //sort by two or more params condition, in mongo sort(price rating)
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort('-createdAt'); // Correcting the field name here
//     }

//     // 4）Field limiting
//     if (req.query.fields) {
//       const fields = req.query.fields.split(',').join(' '); // Convert to 'name description'
//       console.log('Fields selected:', fields); // Should show 'name description'
//       query = query.select(fields);
//       console.log('inside field ', query);
//     } else {
//       query = query.select('-__v'); //exclude fields
//       console.log('inside field else ', query);
//     }

//     // 5} pagination
//     const page = req.query.page * 1 || 1; //default to page 1
//     const limit = req.query.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     query = query.skip(skip).limit(limit);

//     if (req.query.page) {
//       const numCategories = await Category.countDocuments();
//       if (skip >= numCategories) throw new Error('This page does not exist');
//     }

//     // console.log('Query filter:', query.getFilter());
//     // console.log('Query projection:', query.getOptions().projection);
//     // console.log('Query options:', query.getOptions());
//     // console.log('Executing query with:', query.getQuery(), query.getOptions());

//     //EXECUTE QUERY
//     const categories = await query;

//     //send response
//     res.status(200).json({
//       status: 'sccuess',
//       results: categories.length,
//       data: {
//         categories,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       stauts: 'fail',
//       message: err,
//     });
//   }
// };
//fn is function passed in , it is become a module in utils: catchAsync
// const catchAsync = fn => {
//   //express gonna bring in req, res, next to the function
//   return (req, res, next) => {
//     // fn(req, res, next).catch(err=> next(err))  //pass error to global error handler in app.js
//     fn(req, res, next).catch(next);
//   };
// };

//POST METHOD : create new
exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body); //await because it is from net returns promise

  res.status(200).json({
    status: 'success',
    data: {
      category: newCategory,
    },
  });
  //   try {
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'failed',
  //     message: err,
  //   });
  // }
});

// exports.getCategoriesById = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         category,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

exports.getCategoriesById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
  // try {
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.updateCategories = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category, // category： category in ES6, category can be shortened to only category as key value pair has the same name
    },
  });
  // try {
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.deleteCategories = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
  //   try {
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'error',
  //     message: err,
  //   });
  // }
});
//section 102 : aggregation pipeline
exports.getCategoryStats = catchAsync(async (req, res, next) => {
  const stats = await Category.aggregate([
    //return aggregate obejct
    //stages - filter object in mongodb
    {
      $match: {
        ratingAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        //group and then calculate the average of rating
        _id: null, //group by id  always, //can be field name like '$difficuty' as example , { $toUpper: 'difficulty'}, '$ratingsAverage
        numCategories: {
          $sum: 1, //add one for each document
        },
        numRatings: {
          $sum: '$ratingsQuantity',
        },
        avgRating: {
          $avg: '$ratingsAverage',
        },
        avgPrice: {
          $avg: '$price',
        },
        minPrice: {
          $min: '$price',
        },
        maxPrice: {
          $max: '$price',
        },
      },
    },
    {
      $sort: { avgPrice: 1 }, //which field sort this by, 1 for ascending
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }, //not equal
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
  //   try {
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});
//section 103: using stage 'unwind'
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Category.aggregate([
    {
      $unwind: '$startDates', //startDates is array of all days as example, unwind to individual dates
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' }, //group them by the date, aggregatrion by operators in mongo documentation
        numCategoryStarts: { $sum: 1 },
        tours: {
          $push: '$name', //field , make it into array
        },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        //give each field to 0 or 1
        _id: 0,
      },
    },
    {
      $sort: {
        numCategoryStarts: 1, // or -1 descending , 1 is ascending
      },
    },
    {
      $limit: 6, // 6 outputs as an example
    },
  ]);
  res.stauts(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
  // try {
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});
