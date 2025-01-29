const userModel = require('../model/userModel')

const { getAllFactory,
    createAllFactory,
    deleteByIdFactory,
    getElementByIdFactory
    }=require("../utility/crudFactory");


/************USERS***********/
//create a user
const createUserHandler=createAllFactory(userModel)
//get a user from the database based on id
const getUserById=getElementByIdFactory(userModel)
//get all users from the database
const getAllUsers=getAllFactory(userModel)
//delete a user from the database based on id
const deleteUserById=deleteByIdFactory(userModel)


module.exports={createUserHandler,getUserById,deleteUserById,getAllUsers}