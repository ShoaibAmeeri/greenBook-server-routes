const express = require("express");
const Reviews = require("../model/review");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// get route for user
router.get("/", async (req, res) => {
  try {
    const reviews = await Reviews.find({});
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get route single user
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const review = await Reviews.findOne({ _id: id });

    if (!review) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// post route
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const err = [];
    if (!name) {
      err.push("name is required");
    }
    if (!email) {
      err.push("email is required");
    }
    if (!message) {
      err.push("your message is required");
    }

    if (err.length > 0) {
      res.status(400).json({
        status: "validation error",
        message: err,
      });
    }

    const review = new Reviews({ name, email, message });
    review.save();

    res.status(200).json({ data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete route
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const reveiw = await Reviews.findByIdAndDelete({ _id: id });
    if (!reveiw) {
      return res.status(404).json({ message: "the object is not exist" });
    }
    res.status(200).json({ message: "reveiw is deleted", data: reveiw });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update Route
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const reviewUpdate = req.body;
    const review = await Reviews.findByIdAndUpdate({ _id: id }, reviewUpdate, {
      new: true,
    });
    res.status(200).json({ message: "user updated", data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
