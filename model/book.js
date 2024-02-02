const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require,
  },
  price: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isAvail: {
    type: Boolean,
    require: true,
  },
});
const Books = mongoose.model("Book", bookSchema);
module.exports = Books;
