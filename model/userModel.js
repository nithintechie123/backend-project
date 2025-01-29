
const mongoose = require("mongoose");

const userSchemaRules={
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    age:{type:Number,required:true},
    phone:{type:Number,required:true},
    confirmPassword:{type:String,required:true,minlength:8,validate:function(){
        return this.password == this.confirmPassword;
    }},createdAt:{type:Date,default:Date.now()}
}

const userSchema=new mongoose.Schema(userSchemaRules);

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;