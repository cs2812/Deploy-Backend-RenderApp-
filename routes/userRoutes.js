const argon2d = require("argon2")
const express =require("express")
const jwt = require("jsonwebtoken")

const User = require("../schema/userSchema")

const userRoute = express()

userRoute.get("/",async(req,res)=>{
    const data=await User.find()
    res.send(data)
})

userRoute.post("/signup",async(req,res)=>{

    const {username,email,password}=req.body;
    const hash=await argon2d.hash(password); // for save password

    const user=new User({username,email,hash})
    // res.send({username,email,hash})
    await user.save();
    res.status(201).send("SignUp Successful")

})

userRoute.post("/login",async(req,res)=>{

    const {username,password}=req.body;

    const find =await User.findOne({username}) // it will give you object 
    
    const verify = await argon2d.verify(find.hash , password)

    if(verify){

       const token = jwt.sign(
        { id:find._id, name:find.username, email:find.email },//you can give whatever you want to give or keep it empty
        "SECRET1234", // You can write whatever you want.
        { 
            expiresIn:"1days" // token will be expire after 1days 
        })

        return res.send({ message:"Logged in successfull", token })
    
    }
})





module.exports=userRoute;