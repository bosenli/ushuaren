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

//GET METHOD : get category
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
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
