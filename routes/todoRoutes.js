const express = require("express")

const Todo =require("../schema/todoSchema")

const jwt = require("jsonwebtoken")

const todoRoutes = express.Router()

todoRoutes.use(express.json())


// Get Todo Route 
todoRoutes.get("/", async(req,res)=>{
    // res.send("test")
    
    const token = req.headers['token']
    if(token){
    const decode= jwt.decode(token)

    // res.send(decode)
    const data =await Todo.find({userId : decode.id})
    
    res.send(data)
    }
    else if(!token){
        res.status(401).send({message:"Login for Authentication"})
    }
    else{
        res.status(500).send({message:"Somthing is Wrong"})

    }
    
})
// Get Single Todo Route
todoRoutes.get("/:id", async(req,res)=>{
    const id =req.params.id
    const data =await Todo.findOne({_id:id})
    res.send(data)

})

// delete single todo
todoRoutes.delete("/:id", async (req,res)=>{
    const {id}=req.params;
    const data = await Todo.findByIdAndDelete(id)
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
        res.status(200).send(data)
    
    }
    else if(!token){
        res.status(401).send({message:"Login for Authentication"})
    }
    else{
        res.status(500).send({message:"Somthing is Wrong"})

    } 
})

// Patch Todo Route
todoRoutes.patch("/:id", async (req, res) => {
    const updatedInfo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send("Todo Updated");
  });

module.exports=todoRoutes;