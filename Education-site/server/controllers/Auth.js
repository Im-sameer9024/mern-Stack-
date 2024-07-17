const User = require("../models/User")
const OTP = require("../models/Otp")
const otpGenerator = require("otp-generator")

exports.sendOTP = async(req,res) =>{
    try {
        
        // fetch email 
    const {email} = req.body;

    // check if user already exist 

    const checkUserPresent = await User.findOne({email})

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already exists"
        })
    }

    let otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    console.log("Otp generated",otp)

    const otpPayload = {email,otp}

    // create an entry in for Otp 

    const otpBody = await OTP.create(otpPayload)
    console.log(otpBody)

    res.status(200).json({
        success:true,
        message:"OTP Sent Successfully",
        otp,
    })


    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}


exports.signUp = async(req,res)=>{
    try {
        
        // data fetch from request ki body 
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body

        if(!firstName || !lastName ||!email ||!password ||!confirmPassword ||!otp ){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success :false,
                message:"password and confirmPassword does not match"
            })
        }

        const existingUser = await User.findOne({email})
if(existingUser){
return res.status(400).json({
    success:false,
    message:"User already exists"
})

const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
console.log(recentOtp)

if(recentOtp.length == 0){
    return res.status(400).json({
        success:false,
        message:'OTP Found'
    })
}


}

    } catch (error) {
        
    }
}