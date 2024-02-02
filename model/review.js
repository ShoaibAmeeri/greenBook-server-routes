const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
},
  contact: {
    type: String
  },
  email: {
    type: String
},
  profession: {
    type: String
},
  message: {
    type: String,
    require : true    
},
});
const Reviews = mongoose.model("review", reviewSchema);
module.exports = Reviews;
