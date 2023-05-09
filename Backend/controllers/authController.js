const User=require('../models/user');
const sendToken=require('./../utils/jwtToken');
const ErrorHandler=require('../utils/errorHandler');
const catchAsync=require('../middlewares/catchAsync');
const sendMail = require('../utils/sendMail');
const crypto=require('crypto');
const cloudinary=require('cloudinary')
const jwt=require('jsonwebtoken');
const {template}=require('../utils/emailTemplate')

exports.registerUser=catchAsync(async(req,res,next)=>{
    
    const {name,email,password}=req.body;
    let result
    if(req.body.avatar!==""){
        console.log(req.body.name)
     result=await cloudinary.v2.uploader.upload_large(req.body.avatar,{
        folder:'avatars',
        width: 400,
        height: 450,
        quality: 100,
        crop: "scale",
    })
}else{
     result={
        public_id:"default",
        secure_url:'https://res.cloudinary.com/domz3d3zt/image/upload/v1678186387/avatars/default_avatar_pu0dvz.webp'
    }
}
const user=await User.create({
    name,
    email,
    password,
    avatar:{
        public_id:result.public_id,
        url:result.secure_url
    }
})
sendMail({
  email:user.email,
  subject:'Thank You For Visiting.',
  message:template('',user.name)
})
   
   


   
    // const token =user.getJwtToken(); 
    sendToken(user,200,res)
})

// OTP less login check 
exports.loginWithOtpless=catchAsync(async(req,res,next)=>{
    const email=req.body.email;
    if(!email){
        return next(new ErrorHandler('Email id is not there',404))
    }
    const user=await User.findOne({email})
    if(!user){
        return next(new ErrorHandler('User does not exists with this email id,Please Signup First'));
    }
    sendToken(user,200,res);

})

exports.loginUser=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;

    
    if(!email ||!password){
        return next(new ErrorHandler('Please enter deatils',404))

    }


    const user=await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401))

    }

    // checking if password is coorect 
    const isPasswordMatched=await user.comparePassword(password) ;

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401));

    }
    // const token=user.getJwtToken();

    sendToken(user,200,res);


})


exports.logout=catchAsync(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged out'
    })

})

exports.forgotPassword=catchAsync(async(req,res,next)=>{
   console.log(req.body)
    const user=await User.findOne({email:req.body.email});
    
    if(!user){
        return next(new ErrorHandler('User not found with this email Id ',404));

    }

    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});


    const resetUrl=`${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message=`Your password reset token is as follow :\n\n${resetUrl}\n\nIf you have not requested this email,then ignore it.`

    try{
        await sendMail({
            email:user.email,
            subject:'HomeShop Password Recovery',
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to: ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
         
        return next(new ErrorHandler(error.message,500))
    }

})


exports.resetPassword=catchAsync(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}

    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired ',400))

    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400))

    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);

})

exports.getUserDataFromToken=catchAsync(async(req,res,next)=>{
    const {token}=req.cookies
  

    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401));

    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id);
    if(!user)return next(new ErrorHandler('No user found',404))
    res.status(200).json({
        status:'Success',
        user
    })
})


exports.getUserProfile=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

exports.updatePassword=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password');
    const isMAtched=await user.comparePassword(req.body.oldPassword)
    
    console.log(isMAtched)
   if(!isMAtched){
    return next(new ErrorHandler('Old password is incoorect',400))

   }

   user.password=req.body.newPassword;
   await user.save();

   sendToken(user,200,res)
})




exports.updateUserProfile =catchAsync(async(req,res,next)=>{
    console.log("hello")
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    // UPDATE user avatar
    if(req.body.avatar!==''){
        const user =await User.findById(req.user.id)

        const image_id=user.avatar.public_id;
        const resu=await cloudinary.v2.uploader.destroy(image_id)
       const   result=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatars',
            width:150,
            crop:'scale'
        })   


        newUserData.avatar={
            public_id:result.public_id,
            url:result.secure_url
        }
    }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
  console.log(user)
    res.status(200).json({
        success:true,
        user
    })
})

exports.getAllUser=catchAsync(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })

})


exports.getUSerDetails=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('User does not found ...'))
    }

    res.status(200).json({
        success:true,
        user
    })
})


exports.updateUserProfileByAdmin =catchAsync(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    // UPDATE user avatar

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})



exports.deleteUSer=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('User does not found ...'))
    }


    // Delete Avatar of user

    await user.remove()

    res.status(200).json({
        success:true,
        user
    })
})
