const argon2 = require("argon2")
const express =require("express")
const jwt = require("jsonwebtoken")

const User = require("../schema/userSchema")

const userRoute = express.Router()

userRoute.get("/",async(req,res)=>{
    
    const data=await User.find()
    res.send(data)
})


// userRoute.delete("/:id",async(req,res)=>{
//     const {id}=req.params;
//     const data = await User.findByIdAndDelete(id)
//     res.send(data)
// })

userRoute.post("/signup",async(req,res)=>{
    // 201 for create somthing
    const {username,password,email}=req.body;
    if(!password || !username || !email){
        return res.status(401).send("please fill All details")
    }
    const hash=await argon2.hash(password); // for save password
    try{
        const user=new User({username,email,hash})
        await user.save();
        res.status(201).send("User Signup Successfully ")
    }
    catch{
        res.status(401).send("Somthing went worong or Email should be uniqe")
    }
       
});

userRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).send("please fill All details")
    }

    const find =await User.findOne({email}) // it will give you object 
    if(!find.username){
        res.send({messaage:"Fill Right Details"})
    }
    
    const verify = await argon2.verify(find.hash , password)

    try{
        if(verify){
    
           const token = jwt.sign(
            { id:find._id, name:find.username, email:find.email },//you can give whatever you want to give or keep it empty
            "SECRET1234", // You can write whatever you want.
            { 
                expiresIn:"1days" // token will be expire after 1days 
            })
    
            return res.send({ message:"Logged in successfull",user:find.username, token })
    
        }
    }
    catch{

        return res.status(401).send({messaage:"Fill Right Details"})
    }

})

module.exports=userRoute;