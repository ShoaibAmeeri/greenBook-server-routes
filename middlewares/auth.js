const Tokens = require("../model/token")
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config()

const checkAuth = async(req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized ie. token in missing" });
    }

    token = token.split(" ")[1];
    
    const tempToken = await Tokens.findOne({token : token})
    if (tempToken.status === "invalid") {
      return res.status(500).json({message: "your token is invalid"})
    }

  
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res
          .status(500)
          .json({ error: err.message, message: "token is not valid" });
      }
      req.body.id = authData.id;
      next()
    });
  } catch (error) {
    res.status(501).json({ message: error.message })
    console.log(error);
  }
};

module.exports = checkAuth