const express=require("express")
const mongooes =require("mongoose")

const FriendRoute = require("./routes/friend")
const app = express()
const port=3000

app.use(express.json())

app.use("/friend",FriendRoute)

app.get("/",(req,res)=>{
    res.send("Hello Chetan")
})

app.get("/movie",(req,res)=>{
    res.send("Welcome to movie ApI")
})

app.get("/test",(req,res)=>{
    res.send("Welcome to test ApI")
})


app.listen(process.env.PORT || port,async()=>{
    await mongooes.connect(`mongodb+srv://chetan:12345@cluster0.4jf6kcr.mongodb.net/?retryWrites=true&w=majority`)
    console.log(`App start on ${port}`)
})