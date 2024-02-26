const express = require("express");
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})



const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updatePassword,
  loginUser,
  updateInfo,
} = require("../controler/user");

const checkAuth = require("../middlewares/auth")
const {uploadFile} = require("../middlewares/upload")

router.get("/", checkAuth, getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/", deleteUser);
router.patch("/info", checkAuth, updateInfo); //update user
router.patch("/update-password/", checkAuth, updatePassword); //update only user password
router.patch("/profile/", [upload.single('file'), uploadFile, checkAuth], updateUser); //update user info (name and email)

// router.post("/login", loginUser);
router.route("/login").post(loginUser);
module.exports = router;
