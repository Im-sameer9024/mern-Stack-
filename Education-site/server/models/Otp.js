const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expire:5*60,
    }
})


// used for email send 

async function sendVerificationMail(email,otp){
    try {

         let mailResponse = await mailSender(email,"Verfication code",otp)
        console.log("this is response",mailResponse)
        
    } catch (error) {
        console.log(error)
        
    }
}

otpSchema.pre("save",async(next)=>{
try {
    await sendVerificationMail(this.email , this.otp)
    next()
} catch (error) {
    next(error)
}
})


module.exports = mongoose.model("Otp",otpSchema)