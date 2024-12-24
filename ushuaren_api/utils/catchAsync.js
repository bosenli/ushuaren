module.exports = fn => {
  //express gonna bring in req, res, next to the function
  return (req, res, next) => {
    // fn(req, res, next).catch(err=> next(err))  //pass error to global error handler in app.js
    fn(req, res, next).catch(next);
  };
};
