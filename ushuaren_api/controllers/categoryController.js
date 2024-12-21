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
exports.getAllCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
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

exports.getCategoriesById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {},
  });
};

exports.updateCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
};
exports.deleteCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
};
