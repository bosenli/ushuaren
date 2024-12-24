//USER SEND REQUEST FROM APP.JS FILE

const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const category = require('./routes/categoryRouter');

const app = express();

// FIRST MIDDLEWARE, 顺序重要 ， 用来处理response添油加醋
app.use(morgan('dev'));

app.use(express.json()); //for post request to work properly

//app.use((req,res, next) =>{

// })
// app.use((req, res, next)=>{
//     res.send('<button type="submit">submit</button>')
// });
// app.get('/', (req, res) => {
//   res.send('hello from serverside');
// });

// 2) ROUTE HANDLESERS (moved to controllers)

//3) ROUTES (mount the routers. moved to routes folder, mounted to 'categroy' routes)
app.use('/api/v1/category', category);

//4) START SERVER (moved to server.js file)

//5) handle unhandled Routes: all to handle get, post, update, delete
app.all('*', (req, res, next) => {
  //1) one way error handle
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  //2) second way error handle
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  //3) third way error handle - centralized error handling on Util file appError
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 6) error handling experss middleware
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   err.statusCode = err.statusCode || 500;
//   err.status = err.stauts || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });
app.use(globalErrorHandler);

module.exports = app; //used by server.js
