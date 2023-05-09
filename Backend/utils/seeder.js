const dotenv=require('dotenv');
const connectDatabase=require('../config/database');
const products=require('../data/product');
const {connect}=require('mongoose');
const Product = require('../models/product');


dotenv.config({path:'Backend/config/config.env'})

connectDatabase();

const seedProduct=async()=>{
    try{
        await Product.deleteMany();
        console.log('Products are deleted ');
        console.log(products)
        await Product.insertMany(products);
        console.log("All Products are added.")
        process.exit()
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedProduct()