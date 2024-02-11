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
router.delete("/", deleteUser);
router.patch("/", updateUser); //update user
router.patch("/pass/", updatepassword); //update only user password
router.patch("/info/:id", updateInfo); //update user info (name and email)

// router.post("/login", loginUser);
router.route("/login").post(loginUser);
module.exports = router;
