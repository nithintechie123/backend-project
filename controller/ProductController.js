const productModel=require("../model/productModel")

const { getAllFactory,
        createAllFactory,
        deleteByIdFactory,
        getElementByIdFactory
        }=require("../utility/crudFactory");


/************PRODUCTS***********/
//create a product
const createProductHandler=createAllFactory(productModel);
//get a product from the database based on id
const getProductById=getElementByIdFactory(productModel)
//get all product from the database
const getAllProducts=getAllFactory(productModel)
//delete a product from the database based on id
const deleteProductById=deleteByIdFactory(productModel)


module.exports = {createProductHandler,getProductById,deleteProductById,getAllProducts};