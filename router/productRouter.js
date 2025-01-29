const express = require('express');

const {getAllProducts, createProductHandler, getProductById, deleteProductById}=require("../controller/ProductController");


const ProductRouter=express.Router();


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


/****product APIs******/
ProductRouter.get("/",getAllProducts);
ProductRouter.post("/",checkInput,createProductHandler);
ProductRouter.get("/:productId",getProductById);
ProductRouter.delete("/:productId",deleteProductById);

module.exports = ProductRouter;