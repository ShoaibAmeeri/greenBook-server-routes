const { default: mongoose } = require("mongoose")



async function dbConnect(){
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Database connection established")
      })
      .catch  ((err)=>{
      console.log(err.message)
      })     
}

module.exports=dbConnect