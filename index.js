const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const buyerRoutes = require("./controler/buyer");
const userRoutes = require("./controler/user");
const reviewRoutes = require("./controler/review");
const bookRoutes = require("./controler/books");
const dbConnect = require("./controler/utilies/config");

const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
dotenv.config();

// -----------------------------------DB connection---------------------------------------------

dbConnect();

// Buyers Route
app.use("/buyers", buyerRoutes);

//for users---------------------------------
app.use("/users", userRoutes);

// for Reviews----------------------------------------------
app.use("/reviews", reviewRoutes);

// for books----------------------------------------------
app.use("/books", bookRoutes);

// -----------------------------------------port host conneciton-------------------
const port = process.env.PORT || 8000;
const server = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  console.log("Connection successfull");
  res
    .status(200)
    .json({ message: "the connection is established and work properly" });
});

app.listen(port, server, () => {
  console.log(`server is listening on http://${server}:${port}`);
});
