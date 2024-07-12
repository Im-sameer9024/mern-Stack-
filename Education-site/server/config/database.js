const mongoose = require("mongoose")

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useNewTopology:true,
    })
    .then(()=>{ console.log("DB Connect Successfully")})
    .catch((error)=>{
        console.log(error.message)
        process.exit(1)
    })
}

module.exports = dbConnect;