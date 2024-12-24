const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //programming or other unknow error: dont leak error details
    //1) log error
    console.log('ERROR ', err);
    //2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong in error controller',
    });
  }
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message); // loop error object
  const message = `Invalid input data.${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDubplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate field value: ${value} Please use another value!  `;
  return new AppError(message, 400);
};

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.stauts || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error); //transform mongo db cast error into friendly message that human can read
    sendErrorProd(error, res);
    if (error.code === 11000) error = handleDubplicateFieldsDB(error); //the code from post man code fields from mongo driver
    if (error.name === ValidationError) error = handleValidationErrorDB(error);
    sendErrorProf(error, res);
  }

  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: 'in error controller ' + err.message,
  // });
};
