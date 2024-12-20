const express = require('express');
const morgan = require('morgan');
const app = express();

// FIRST MIDDLEWARE, 顺序重要 ， 用来处理response添油加醋
app.use(morgan('dev'));

app.use(express.json()); //for post request to work properly

//app.use((req,res, next) =>{

// })
// app.use((req, res, next)=>{
//     res.send('<button type="submit">submit</button>')
// });

// 2) ROUTE HANDLESERS
const getAllHomeCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
};

const getHomeCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
};

const updateHomeCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
};
const deleteHomeCategories = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route is not yet defined!',
  });
};
//3) ROUTES
const homeRouter = express.Router();
app.use('/api/v1/homeCategory', homeRouter);

homeRouter.route('/').get(getAllHomeCategories);
homeRouter
  .route('/:id')
  .get(getHomeCategories)
  .patch(updateHomeCategories)
  .delete(deleteHomeCategories);

//4) START SERVER
app.get('/', (req, res) => {
  res.send('hello from serverside');
});

//
module.exports = app;
