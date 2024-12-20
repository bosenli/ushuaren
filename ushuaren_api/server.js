//server.js -> request from browser -> router -> controller -> response

const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
