const mongooes =require("mongoose")

const userScheam =new mongooes.Schema({

    username:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    hash:{type:String,require:true},

})

const user = mongooes.model("friend",userScheam)
module.exports= user