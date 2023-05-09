const sendToken=(user,statusCode,res)=>{
    const token =user.getJwtToken();

    const option ={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true
    }
    console.log(token)
    res.status(statusCode).cookie('token',token,option).json({
        success:true,
        user,
        token
    })
}

module.exports=sendToken