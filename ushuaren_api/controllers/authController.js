const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');


exports.signup = catchAsync(async (req,res, next) =>{
    const newUser = await User.create(req.body)  //return a promise
    res.status(201).json({
        status:'success',
        data:{
            user: newUser
        }
    })
})