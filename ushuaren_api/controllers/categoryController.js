const Category = require('./../models/categoryModel');

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

//GET METHOD : get category
exports.getAllCategories = async (req, res) => {
  try {
    // let query = Category.find(); // No conditions

    const queryObj = { ...req.query }; //filter function
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    //console.log('query str ', queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    //gte, gt, lte, lt
    let query = Category.find(JSON.parse(queryStr)); //filter function

    // 3)Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); //sort by two or more params condition, in mongo sort(price rating)
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Correcting the field name here
    }

    // 4）Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' '); // Convert to 'name description'
      console.log('Fields selected:', fields); // Should show 'name description'
      query = query.select(fields);
      console.log('inside field ', query);
    } else {
      query = query.select('-__v'); //exclude fields
      console.log('inside field else ', query);
    }

    // 5} pagination
    const page = req.query.page * 1 || 1; //default to page 1
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numCategories = await Category.countDcouments();
      if (skip >= numCategories) throw new Error('This page does not exist');
    }

    // console.log('Query filter:', query.getFilter());
    // console.log('Query projection:', query.getOptions().projection);
    // console.log('Query options:', query.getOptions());
    // console.log('Executing query with:', query.getQuery(), query.getOptions());

    //EXECUTE QUERY
    const categories = await query;

    //send response
    res.status(200).json({
      status: 'sccuess',
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(404).json({
      stauts: 'fail',
      message: err,
    });
  }
};

//POST METHOD : create new
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body); //await because it is from net returns promise

    res.status(200).json({
      status: 'success',
      data: {
        category: newCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getCategoriesById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        category, // category： category in ES6, category can be shortened to only category as key value pair has the same name
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};
