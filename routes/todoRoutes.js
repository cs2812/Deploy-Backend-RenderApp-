const express = require("express")

const Todo =require("../schema/todoSchema")

const jwt = require("jsonwebtoken")

const todoRoutes = express()

todoRoutes.use(express.json())


// Get Todo Route 
todoRoutes.get("/", async(req,res)=>{
    
    const data =await Todo.find()
    res.send(data)

    const token = req.headers['token']
    try{
        if(token){
        const decode= jwt.decode(token)

        // res.send(decode)
        const data =await Todo.find({userId : decode.id})
        
        res.send(data)

        }
    }
    catch{
        res.status(401).send("Login First")
    }
})

todoRoutes.delete("/:id", async (req,res)=>{
    const {id}=req.params;
    const data = await Todo.findByIdAndDelete(id)
    res.send(data)
})


// Get Single Todo Route
todoRoutes.get("/:id", async(req,res)=>{
    const id =req.params.id
    const data =await Todo.findOne({_id:id})
    res.send(data)

})


// Post Todo Route
todoRoutes.post("/",async(req,res)=>{
    const token = req.headers['token']
    // console.log(token)
    if(token){

        const {todo,status} = req.body
        const decode = jwt.decode(token);
        const data=new Todo({todo,status,userId:decode.id}) 

        await data.save();
        res.status(201).send("Add todo Successful")
    
    }
    else{
       return res.status(401).send("Login Pleace")
    } 
})

module.exports=todoRoutes;