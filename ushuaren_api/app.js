//USER SEND REQUEST FROM APP.JS FILE

const express = require('express');
const morgan = require('morgan');

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

module.exports = app; //used by server.js
