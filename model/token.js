const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "valid"
  },
});



const Tokens = mongoose.model("Token", tokenSchema);

module.exports = Tokens;
