const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  description: String,
  isAvail: Boolean,
});
const Books = mongoose.model("Book", bookSchema);
module.exports = Books;
