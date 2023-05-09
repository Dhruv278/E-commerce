const express=require("express");
const app=express();
const product=require('./routes/product');
const auth=require('./routes/auth');
const cookieParser=require('cookie-parser');
const errorMidleware=require('./middlewares/error');
const bodyparser=require('body-parser')
const cloudinary=require('cloudinary').v2
const order=require('./routes/order')
const path=require('path')
const fileUpload=require('express-fileupload')
const paymentController=require('./routes/payment')
var cors = require("cors");
app.use(cors());
app.use(express.json({limit:'50mb', extended: true}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(fileUpload({
    limits: { fileSize: 50* 1024 * 1024 * 1024 },
  }));
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())
// setting up cloudinary configiration
// 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})




app.use('/api/v1',auth);
app.use('/api/v1',product);
app.use('/api/v1',order);
app.use('/api/v1',paymentController);
if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../Frontend/build')))
    app.get('*',(req,res)=>{
            
            console.log(__dirname)
            console.log(path.join(__dirname,'../Frontend/build'))
            res.sendFile(path.resolve(__dirname,'../Frontend/build/index.html'))
        })
    }
app.use(errorMidleware);

module.exports=app;