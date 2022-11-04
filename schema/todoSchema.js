const mongoose =require("mongoose")

const todoSchema = new mongoose.Schema({

    todo:{type:String,required:true},
    status:{type:Boolean,required:true},
    userId:{type:String,required:true},

})

const Todo = mongoose.model("todo",todoSchema)

module.exports= Todo;

//6362c8ddd7cf15c301677012