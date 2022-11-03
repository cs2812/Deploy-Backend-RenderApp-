const mongooes =require("mongoose")

const todoSchema = new mongooes.Schema({

    todo:{type:String,require:true},
    status:{type:Boolean,require:true},
    userId:{type:String,require:true},

})

const todo = mongooes.model("todo",todoSchema)

module.exports= todo;

//6362c8ddd7cf15c301677012