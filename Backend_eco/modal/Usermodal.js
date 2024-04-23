const mongoose=require("mongoose");
const validatoe=require("validator");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        
    }
})