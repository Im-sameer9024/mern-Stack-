const express = require("express")
const route = express.Router()

const{signUp,login} = require("../controllers/auth")
const{auth,isStudent,isAdmin} = require("../middleware/middleware")

route.post("/signup",signUp)
route.post("/login",login)

route.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route'
    })
})

route.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Protected route for Student"
    })
})

route.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the portected route for Admin"
    })
})
module.exports = route