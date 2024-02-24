const express = require("express");
const {
  // getBook,
  getBooks,
  // createBook,
  // deleteBook,
} = require("../controler/books");

const router = express.Router();

// router.post("/", createBook);
router.get("/", getBooks);
// router.get("/:id", getBook);
// router.delete("/:id", deleteBook);

// //----------------------------------Base uri reponse------------------------------------------

module.exports = router;
