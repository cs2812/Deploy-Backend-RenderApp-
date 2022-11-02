const express =require("express")
const User = require("../schema/friend")
const FriendRoute = express()

FriendRoute.get("/",async(req,res)=>{
    const data=await User.find()
    res.send(data)
})

FriendRoute.get("/:id", async(req,res)=>{
    try{
        let user=await User.findById(req.params.id)
        res.send(user)
    
}catch(e){
  res.send(e.message)
}
})

FriendRoute.post("/", async(req,res)=>{
    try{
        const user=await User.create(req.body)
        res.send(user) 
    }catch(e){
    res.status(401).send(e.message)
    }
    })

module.exports=FriendRoute