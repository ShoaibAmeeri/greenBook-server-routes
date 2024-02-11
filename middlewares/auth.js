const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config()

const checkAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized ie. token in missing" });
    }

    token = token.split(" ")[1];
    console.log(token);
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkAuth