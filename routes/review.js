const express = require("express");
const router = express.Router();

const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../controler/review");

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/", createReview);
router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);

module.exports = router;
