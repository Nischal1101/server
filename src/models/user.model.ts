import mongoose, { model } from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        requied:true,
        unique:true
    },



},{timestamps:true});
 const User=mongoose.model('User',userSchema);

 
 
 export default User;
