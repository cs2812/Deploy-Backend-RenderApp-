const express=require("express")
const mongooes =require("mongoose")

const todoRoutes = require("./routes/todoRoutes")

const userRoute = require("./routes/userRoutes")
const app = express()
const port=8000



app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/user",userRoute)
app.use("/todo",todoRoutes)

app.get("/",(req,res)=>{
    res.send("Hello Chetan {ADMIN}")
})


app.listen(process.env.PORT || port,async()=>{
    await mongooes.connect(`mongodb+srv://chetan:12345@cluster0.4jf6kcr.mongodb.net/?retryWrites=true&w=majority`)
    console.log(`App start on ${port}`)
})

