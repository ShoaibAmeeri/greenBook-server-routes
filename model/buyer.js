const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
},
  date: {
    type : Date
},
  address: {
    type : String,
    require : TransformStreamDefaultController
},
});
const Buyers = mongoose.model("Buyer", buyerSchema);
module.exports = Buyers;
