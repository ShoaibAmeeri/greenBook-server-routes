const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updatepassword,
  loginUser
} = require("../controler/user");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
router.patch("/pass/:id", updatepassword)

module.exports = router;
