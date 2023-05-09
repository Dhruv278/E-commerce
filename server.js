
const dotenv=require("dotenv");
dotenv.config({path:"./backend/config/config.env"});
const connectDatabase=require('./Backend/config/database');

const app=require("./Backend/app");

process.on('uncaughtException',err=>{
    console.log(`ERROR:${err.stack}`);
    console.log('Shutting down due to uncught exception ');
    process.exit(1);
})

// Setting config file
connectDatabase();
const PORT=process.env.PORT ;
const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to unhandled Promise rejection');
    server.close(()=>{
        process.exit(1);
    })
})