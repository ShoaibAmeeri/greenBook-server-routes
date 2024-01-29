const express = require("express");
const router = express.Router();

const {
  getBuyers,
  createBuyer,
  getBuyer,
  deleteBuyer,
  updateBuyer,
} = require("../controler/buyer");

router.get("/", getBuyers);
router.post("/", createBuyer);
router.get("/:id", getBuyer);
router.delete("/:id", deleteBuyer);
router.patch("/:id", updateBuyer);

module.exports = router;
