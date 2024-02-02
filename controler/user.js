const Users = require("../model/user");
const { default: mongoose } = require("mongoose");

// get route for users
let getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
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
    const { name, email, password } = req.body;
    const err = [];
    if (!name) {
      err.push("name is required");
    }
    if (!email) {
      err.push("email is required");
    }
    if (!password) {
      err.push("address no is required");
    }
    if (err.length > 0) {
      return res.status(400).json({
        status: "Validation error",
        message: err,
      });
    }
    const user = new Users({ email, name, password });
    await user.save();

    res.status(200).json({
      status: "User created Successfully",
      token: await user.generateToken(),
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete route
let deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const user = await Users.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }
    res.status(200).json({ message: "user deleted successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update Route
let updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }

    const userUpdate = req.body;
    const user = await Users.findByIdAndUpdate({ _id: id }, userUpdate, {
      new: true,
    });
    res.status(200).json({ message: "user updated", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
let updatepassword = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const pass = req.body;
    const user = await Users.findOneAndUpdate({ _id: id }, pass, {
      new: true,
    });

    if (!user) {
      res.status(400).json("some error in updating query");
    }
    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let updateInfo = async (req, res) => {
  try {
    const id = req.params.id

    const {name, email} = req.body

    const updatedInfo = await Users.findOneAndUpdate({_id: id}, {name, email},{
      new: true
    })

    if (!updatedInfo) {
      res.status(500).json({message : "error in update query"})
    }

    res.status(200).json({status : "update data successfully",
  data : updateInfo})
    
  } catch (error) {
    res.status(500).json("intenal server error")
  }
}

let loginUser = async (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("password is incorrect");
      }
    } else {
      res.json("no record registered");
    }
  });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updatepassword,
  loginUser,
  updateInfo
};
