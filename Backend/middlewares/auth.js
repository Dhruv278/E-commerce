const ErrorHandler = require('../utils/errorHandler');
const catchAsync=require('./catchAsync');
const jwt=require('jsonwebtoken');
const User=require('./../models/user');




exports.isAuthenticatedUser=catchAsync(async(req,res,next)=>{
    const {token}=req.cookies
    // console.log(token)

    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401));

    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next()
})

exports.authorizeRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            new next(new ErrorHandler(`${req.user.role} not aollowed to use this content`,403));
        }
        next()
    }
}