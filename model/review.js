const mongoose  = require("mongoose")



const reviewSchema = new mongoose.Schema({
    'name' : String,
    'contact' : String,
    'email' : String,
    'profession' : String,
    'message' : String
    
})
const Reviews = mongoose.model("review", reviewSchema)
module.exports = Reviews