const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signUp = async(req,res)=>{
    try {
        const{name,email,password,role} = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User already Registered"
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10) 
        } catch (error) {
            req.status(500).json({
                success:false,
                message:"Error in hashing Password"
            })
        }

        const user = new User({name,email,password:hashedPassword,role})
        const updatedUser = user.save()

        res.status(200).json({
            success:true,
            message:"user Registered"
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Network issues"
        })
    }
}



exports.login = async(req,res)=>{
    try {
        
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill the input carefully"
            })
        }

        let user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered"
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }

        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });

            user = user.toObject()
            user.token = token;
            user.password = undefined;   
        }else{
            return res.status(403).json({
                success:false,
                message:"password Inc"
            })
        }

    } catch (error) {
        console.log(error)
        return rs.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
}