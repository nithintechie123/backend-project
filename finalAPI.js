const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose"); 
const userModel = require("./userModel");
const productModel = require("./productModel");

const { getAllFactory,
        createAllFactory,
        deleteByIdFactory,
        getElementByIdFactory
        }=require("./utility/crudFactory");

const {PORT,db_user,db_password}=process.env
const app = express();
app.use(express.json());// to get data from user in json format

const dbUrl=`mongodb+srv://${db_user}:${db_password}@cluster0.z2cr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbUrl).then(function(connection){
    console.log("connection successful");
}).catch(function(err){ console.log(err)});


//check if user details are empty
const checkInput=function(req, res, next){
    if(req.method == "POST"){
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        console.log(Object.keys(userDetails))
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"user Details are empty"
            })
        }else{
            next()
        }
    }else{
        next();
    }
}


/************USERS***********/
//create a user
const createUserHandler=createAllFactory(userModel)
//get a user from the database based on id
const getUserById=getElementByIdFactory(userModel)
//get all users from the database
const getAllUsers=getAllFactory(userModel)
//delete a user from the database based on id
const deleteUserById=deleteByIdFactory(userModel)

/************PRODUCTS***********/
//create a product
const createProductHandler=createAllFactory(productModel);
//get a product from the database based on id
const getProductById=getElementByIdFactory(productModel)
//get all product from the database
const getAllProducts=getAllFactory(productModel)
//delete a product from the database based on id
const deleteProductById=deleteByIdFactory(productModel)




/**** user APIs ****/
app.get('/api/user',getAllUsers);
app.post("/api/user",checkInput,createUserHandler);
app.get("/api/user/:userId",getUserById);
app.delete("/api/user/:userId",deleteUserById);


/****product APIs******/
app.get("/api/product",getAllProducts);
app.post("/api/product",createProductHandler);
app.get("/api/product/:productId",getProductById);
app.delete("/api/product/:productId",deleteProductById);



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