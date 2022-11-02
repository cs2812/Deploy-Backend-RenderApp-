const mongooes =require("mongoose")

const userScheam =new mongooes.Schema({

    name:{type:String,require:true,unique:true},
    age:{type:Number,require:true},
    education:{type:String,require:true},
    gender:{type:String,require:true},
    marrage:{type:Boolean,require:true}

})

const user = mongooes.model("friend",userScheam)
module.exports= user