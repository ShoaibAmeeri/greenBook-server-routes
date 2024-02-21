const Users = require("../model/user");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Tokens = require('../model/token')

// get route for users
let getUsers = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await Users.findOne({ _id: id });
    if (user.role === "admin") {
      const users = await Users.find({});
      return res.status(200).json(users);
    }
    console.log(user);
    res.status(403).json({ message: "you are not authorized to do this" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get route single user
let getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// createUser
let createUser = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res.status(200).json({ message: "user exist against this email" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const user = new Users({ email, password: hash, name, role });
      let respone = await user.save();
      if (respone) {
        return res.status(201).json({
          message: "user created",
          user: { _id: user._id, name: user.name, email: user.email },
        });
      } else {
        return res.status(500).json({ message: "user not created" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// Delete route
let deleteUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "not authorized token is missing" });
    }
    token = token.split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res
          .status(500)
          .json({ error: err.message, message: "token is not vlaid" });
      }
      let id = authData.id;
      const user = await Users.findByIdAndDelete({ _id: id });

      if (!user) {
        return res.status(404).json({ message: "user does not exist" });
      }
      res
        .status(200)
        .json({ message: "user deleted successfully", data: user });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update Route
let updateUser = async (req, res) => {
  try {
    let id = req.body.id;
    const userUpdate = req.body;
    const user = await Users.findByIdAndUpdate({ _id: id }, userUpdate);

    res.status(200).json({ message: "user info is updated", data: user });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: error.message });
  }
};

// update info(email, name)
let updateInfo = async (req, res) => {
  try {
    let id = req.body.id;

    const { name, email } = req.body;

    const updatedInfo = await Users.findOneAndUpdate(
      { _id: id },
      { name, email },
      {
        new: true,
      }
    );

    if (!updatedInfo) {
      res.status(500).json({ message: "error in update query" });
    }

    res
      .status(200)
      .json({ status: "update data successfully", data: updateInfo });
  } catch (error) {
    res.status(500).json("intenal server error");
  }
};

let loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "user does not exist against this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1day", audience: "web_app" },
         async(err, token) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }

          const tokenData = new Tokens({
            userId : user._id,
            token: token
          });
          await tokenData.save()
          


          return res.status(200).json({
            message: "signin success",
            user: { name: user.name, email: user.email, token: token },
          });
        }
      );
    } else {
      return res.status(200).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let updatePassword = async (req, res) => {
  try {
    let id = req.body.id;
    const { password, newPassword } = req.body;

    const errors = [];
    if (!password) {
      errors.push("current passowrd is required");
    }
    if (!newPassword) {
      errors.push("new password is required");
    }
    if (errors.length > 0) {
      res.status(500).json({ errors: errors });
    }

    const user = await Users.findOne({ _id: id });
    if (!user) {
      return;
      res.status(404).json({ message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      bcrypt.hash(newPassword, 10, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "hash error", message: err.message });
        }
        user.password = hash;
        const response = await user.save();
        if (response) {


          // update all token in list to invalid

          const token = await Tokens.updateMany({userId: id}, {status: "invalid"})


          return res.status(200).json({
            message: "password has been changed",
            user: { _id: user._id, name: user.name, email: user.email  },
          });
        } else {
          return res.status(500).json({ message: "passowrd is not changed" });
        }
      });
    } else {
      return res.status(500).json({ message: "current password is invalid" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updatePassword,
  loginUser,
  updateInfo,
};
