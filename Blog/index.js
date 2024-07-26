const express = require("express")
const app = express()
require("dotenv").config()
const blog = require("./Routes/blog")
const port = process.env.PORT || 6000
const dbConnect = require("./Config/dataBase")
dbConnect()

app.use(express.json())

app.use("/api",blog)

app.listen(port,()=>{
    console.log(`Port is on ${port}`)
})

app.get("/",(req,res)=>{
    res.send("This is HomePage.")
})



