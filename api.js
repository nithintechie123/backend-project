const express = require("express"); //to create server
require('dotenv').config(); //to use environment variables
const mongoose = require("mongoose"); //to connect to mongodb database
const {PORT,db_user,db_password}=process.env   
const app = express(); 
app.use(express.json());// to get data from user in json format

const UserRouter=require("./router/userRouter");
const ProductRouter=require("./router/productRouter");


const dbUrl=`mongodb+srv://${db_user}:${db_password}@cluster0.z2cr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
 //connect to mongodb database
 //replace db_user and db_password with your own mongodb credentials
 //you can create a new database in mongodb Atlas and replace the cluster0 with your own cluster name

//connect to mongodb database using 
mongoose.connect(dbUrl).then(function(connection){ 
    console.log("connection successful");
}).catch(function(err){ console.log(err)});


app.use("/api/user",UserRouter);
app.use("/api/product",ProductRouter);

app.use("/",function(req,res){
    const value = req.query
    res.status(200).json({
        status:"success",
        message:value
    })
});



//if above routes are not found then this will be executed
app.use(function(req,res){
    res.status(200).json({
        status:"failure",
        message:"404 Page Not Found"
    })
})


//listen to the port
app.listen(PORT,function(req,res){
    console.log(`server is running at ${PORT} port`);
})
