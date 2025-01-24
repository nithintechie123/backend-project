
const mongoose = require("mongoose");

const productSchemaRules={
    name:{
        type:String,
        required:[true,"Kindly pass the name of the product"],
        unique:{type:String,required:true}
      },
    price:{type:String,
        required:true,
        unique:{type:String,required:true},
        validate:{
            validator: function(){
              return this.price >= 0;
            },
            message: "Price must be a positive number"
          }
    },
    quantity:{type:Number,required:true},
    category:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
 };
 //product schema with validation rules and default values
const productSchema=new mongoose.Schema(productSchemaRules);

const productModel=mongoose.model("productModel",productSchema);

module.exports=productModel;