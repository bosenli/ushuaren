class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error'; //2 types of error: opearational error or programming error

    this.isOperational = true; //here we only handle operational error

    Error.captureStackTrace(this, this.constructor); //current object, App error class itself
  }
}

module.exports = AppError;
