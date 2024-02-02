const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: Date,
  address: String,
});
const Buyers = mongoose.model("Buyer", buyerSchema);
module.exports = Buyers;
