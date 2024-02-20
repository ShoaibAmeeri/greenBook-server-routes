const Tokens = require("../model/token");
const { default: mongoose } = require("mongoose");

// get route for Tokens
let getTokens = async (req, res) => {
  try {
    const tokens = await Tokens.find({});
    return res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createtoken
let saveToken = async (req, res) => {
  try {
    const tokenData = req.body;

    const token = new Tokens(tokenData);
    await token.save();
    res.status(200).json({ data: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update token
let updateToken = async (req, res) => {
  try {
    let id = req.body.id;
    if (!mongoose.isValidObjectId) {
      res.json({ message: "the object is not valid" });
    }
    const tokenUpdate = req.body;
    const token = await Tokens.findByIdAndUpdate({ _id: id }, tokenUpdate);

    res.status(200).json({ message: "token info is updated", data: token });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTokens,
  saveToken,
  updateToken,
};
