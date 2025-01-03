const express = require('express');

const categoryController = require('./../controllers/categoryController');
const categoryRouter = express.Router();
const authController = require('./../controllers/authController');
//middleware
// categoryRouter.param('id', (req, res, next, val) => {
//   console.log(`id is ${val}`);
//   next();
// });
// categoryRouter.param('id', categoryController.checkID);

// USER SEND REQUEST, THEN CONTROLLER HANDLE THE RESPONSE FROM DB AND RESPONSE BACK TO USER
categoryRouter
  .route('/top-5-cheap')
  .get(
    categoryController.aliasTopCategory,
    categoryController.getAllCategories
  );

categoryRouter
  .route('/category-stats')
  .get(categoryController.getCategoryStats);

categoryRouter
  .route('/monthly-plan/:year')
  .get(categoryController.getMonthlyPlan);

categoryRouter
  .route('/')
  .get(authController.protect, categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRouter
  .route('/:id')
  .get(categoryController.getCategoriesById)
  .patch(categoryController.updateCategories)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'super'),
    categoryController.deleteCategories
  ); //can be chained multiple middleware

module.exports = categoryRouter; //export the whole thing
