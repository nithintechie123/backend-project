
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
            validator: (value)=>{
              return value>= 0;
            },
            message: "Price must be a positive number"
          }
           },
    quantity:{type:Number,
              required:true,
              validate:{
                validator:(value)=>{
                  return value >= 0;
                }
              }
            },
    category:{
            type:[String],
            required:true
          },
    descriptionText:{
                  type:String,
                  required:[true,"Kindly pass the description text of the product"],
                  maxLength:[1000,"Description text should be less than 1000 characters"]},
    stock_quantity:{
                type:Number,
                required:true,
                validate:{
                  validator:(value)=>{
                    return value >= 0;
                  }
                }
                    },
    brand:{
        type:String,
        required:[true,"Kindly pass the brand of the product"]},
    createdAt:{type:Date,default:Date.now},
 };

 let validCategories=["Electronics", "Clothing", "Audio", "Books", "Accessories"];

 
const productSchema=new mongoose.Schema(productSchemaRules);
 
  //custom validator for category
  productSchema.pre("save",function(next){
    const product=this;

    const invalidCategoriesArr=product.category.filter(category=>!validCategories.includes(category));

    if(invalidCategoriesArr.length>0){
      const err =new Error("Invalid Category");
      next(err);
    }else{
      next();
    }
  })

 //product schema with validation rules and default values

const productModel=mongoose.model("productModel",productSchema);

module.exports=productModel;