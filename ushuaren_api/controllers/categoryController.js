//EXPORTS ALL HANDLERS FOR ROUTES which is to categoryRouter
exports.checkID = (req, res, next, val) => {
  console.log(`id in controller ${val}`);
  if (req.params.id * 1 < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
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
