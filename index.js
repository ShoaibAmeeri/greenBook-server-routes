const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const router = require("./routes/buyer");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");
const bookRoutes = require("./routes/books");
const newsRoutes = require("./routes/news")
const dbConnect = require("./utilies/config");

const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
dotenv.config();

// -----------------------------------DB connection---------------------------------------------

dbConnect();

// Buyers Route
app.use("/buyers", router);
//for users---------------------------------
app.use("/users", userRoutes);
// for Reviews----------------------------------------------
app.use("/reviews", reviewRoutes);
// for books----------------------------------------------
app.use("/books", bookRoutes);
// for News----------------------------------------------
app.use("/news", newsRoutes);
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
