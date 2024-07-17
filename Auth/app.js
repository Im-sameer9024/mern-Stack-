const express = require('express')
const app = express()
require("dotenv").config
const port = process.env.PORT || 5000
const dbConnect = require("./config/database")
const auth = require("./routes/user")

dbConnect()
app.use(express.json())
app.use("/api/v1",auth)

app.listen(port,()=>{
    console.log(`app is on ${port}`)
})
app.get("/",(req,res)=>{
    res.send('This is HomePage.')
})

