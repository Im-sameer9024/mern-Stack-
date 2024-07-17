const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async(req,res,next)=>{
    try {
        
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing'
            })
        }

        try {
            
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is Invalid"
            })
        }
        next()

    } catch (error) {

        return res.status(401).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}