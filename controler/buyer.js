const Buyers = require("../model/buyer");
const { default: mongoose } = require("mongoose");

let getBuyers = async (req, res) => {
  try {
    const buyers = await Buyers.find({});
    res.status(200).json({ data: buyers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
let createBuyer = async (req, res) => {
  try {
    const { email, name, phone, address } = req.body;
    const err = [];
    if (!name) {
      err.push("nameis required");
    }
    if (!email) {
      err.push("email is required");
    }
    if (!phone) {
      err.push("phone no is required");
    }
    if (!address) {
      err.push("address no is required");
    }
    if (err.length > 0) {
      return res.status(400).json({
        status: "Validation error",
        message: err,
      });
    }

    const buyer = new Buyers({ email, name, phone, address });
    buyer.save();
    res.status(200).json({ data: buyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
let getBuyer = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const buyer = await Buyers.findOne({ _id: id });

    if (!buyer) {
      return res.status(404).json({ message: "buyer not found" });
    }
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
let deleteBuyer = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const buyer = await Buyers.findByIdAndDelete({ _id: id });
    if (!buyer) {
      return res.status(404).json({ message: "the object is not exist" });
    }
    res.status(200).json({ message: "buyer is deleted", data: buyer });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
let updateBuyer = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const buyerUpdate = req.body;
    const buyer = await Buyers.findByIdAndUpdate({ _id: id }, buyerUpdate, {
      new: true,
    });
    res.status(200).json({ message: "Category updated", data: buyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBuyers,
  createBuyer,
  getBuyer,
  deleteBuyer,
  updateBuyer,
};
