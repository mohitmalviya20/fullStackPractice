const express = require("express")
const app= express()
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")
const cors=require("cors")


mongoose.connect("mongodb+srv://mohit:VFZv7pMHBBEf2iSM@cluster0.ssm4x.mongodb.net/readWriteAnyDatabase?retryWrites=true&w=majority", 
    {useNewUrlParser: true,useUnifiedTopology:true})
mongoose.connection.on("connected",()=>{
    console.log("DB CONNECTED")
})
mongoose.connection.on("error",()=>{
    console.log("SOME ERROR OCCURED")
})



app.use(express.json())
app.use(cors())
app.use("/api",authRoutes)
app.use("/api",postRoutes)

app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(5000,()=>{
    console.log(`app running at port ${5000}`)
})