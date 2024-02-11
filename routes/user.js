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

const checkAuth = require("../middlewares/auth")
const router = express.Router();

router.get("/", checkAuth, getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/", deleteUser);
router.patch("/", checkAuth, updateUser); //update user
router.patch("/pass/", checkAuth, updatepassword); //update only user password
router.patch("/info/", checkAuth, updateInfo); //update user info (name and email)

// router.post("/login", loginUser);
router.route("/login").post(loginUser);
module.exports = router;
