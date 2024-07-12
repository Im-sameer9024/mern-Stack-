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

async function sendVerificationEmail(email,otp){
    try {
        
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otp)
        console.log("Email sent Successfully",mailResponse)

    } catch (error) {
        console.log(" error occured while mail sent")
        throw error
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next()
})


module.exports = mongoose.model("Otp",otpSchema)