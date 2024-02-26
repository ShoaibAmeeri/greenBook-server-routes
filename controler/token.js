
const mongoose = require("mongoose");
const Tokens = require("../models/tokens");

let  getTokens= async (req, res) => {
  try {
    const tokens = await Tokens.find({});
    res.status(200).json({ data: tokens });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

let saveToken = async (req, res) => {
  try {
    const tokenData = req.body;
    const token = new Tokens(tokenData);
    await token.save();
    res.status(200).json({ data: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}




let updateToken=async (req, res) => {
 
  const id = req.params.id;
  if (!mongoose.isValidObjectId) {
    res.json({ message: "the object id is not valid" });
  }
  const tokenUpdate = req.body;

  const token = await Tokens.findByIdAndUpdate({ _id: id }, tokenUpdate);

  res.status(200).json({ message: "Token info is updated", data: token });


}

module.exports = {
  getTokens,
  saveToken,
  updateToken
};
