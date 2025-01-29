const express = require('express');

const { getAllUsers, createUserHandler, getUserById, deleteUserById } = require('../controller/UserController');

const UserRouter=express.Router();


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



/**** user APIs ****/
UserRouter.get('/',getAllUsers);
UserRouter.post("/",checkInput,createUserHandler);
UserRouter.get("/:userId",getUserById);
UserRouter.delete("/:userId",deleteUserById);

module.exports=UserRouter;