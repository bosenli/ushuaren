const express = require('express');
const categoryController = require('./../controllers/categoryController');
const categoryRouter = express.Router();
//middleware
// categoryRouter.param('id', (req, res, next, val) => {
//   console.log(`id is ${val}`);
//   next();
// });
categoryRouter.param('id', categoryController.checkID);

// USER SEND REQUEST, THEN CONTROLLER HANDLE THE RESPONSE FROM DB AND RESPONSE BACK TO USER
categoryRouter.route('/').get(categoryController.getAllCategories);

categoryRouter
  .route('/:id')
  .get(categoryController.getCategoriesById)
  .patch(categoryController.updateCategories)
  .delete(categoryController.deleteCategories); //can be chained multiple middleware

module.exports = categoryRouter; //export the whole thing
