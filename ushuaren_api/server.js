//server.js -> request from browser -> router -> controller -> response

const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLER EXCEPTION! Shutting down');
  // server.close(() => {
  //   process.exit(1); //code 1: uncaught exception- , code 0 : sucess
  // });
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
// console.log('dev env', process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// console.log('Database URI:', DB);

mongoose
  .connect(DB, {})
  .then(con => {
    // console.log(con.connection);
    console.log('DB connection successful!');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// learn handle ERRORS outside express: unhandled rejection
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down');
  server.close(() => {
    process.exit(1); //code 1: uncaught exception- , code 0 : sucess
  });
});
