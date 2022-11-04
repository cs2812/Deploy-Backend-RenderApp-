const mongoose =require("mongoose")

const userScheam =new mongoose.Schema({

    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    hash:{type:String,required:true},

})

const User = mongoose.model("userdata",userScheam)
module.exports= User;