const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updatepassword,
  loginUser,
  updateInfo,
} = require("../controler/user");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser); //update user
router.patch("/pass/:id", updatepassword); //update only user password
router.patch("/info/:id", updateInfo); //update user info (name and email)

router.post("/login", loginUser);
module.exports = router;
