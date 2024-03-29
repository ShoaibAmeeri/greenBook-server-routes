const Books = require("../model/book");
const { default: mongoose } = require("mongoose");

let createBook = async (req, res) => {
  try {
    const { name, image, price, description } = req.body;
    const err = [];
    if (!name) {
      err.push("name is required");
    }
    if (!image) {
      err.push("image is required");
    }
    if (!price) {
      err.push("price is required");
    }
    if (!description) {
      err.push("description is required");
    }
    if (err.length > 0) {
      res.status(400).json({
        status: "validation error",
        message: err,
      });
    }

    const bookExist = await Books.findOne({ image: image });
    if (bookExist) {
      return res.status(400).json({ msg: "book has been already in stock" });
    }
    const book = new Books({ name, image, price, description });
    book.save();
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get route for users
let getBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get route single book
let getBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const book = await Books.findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ message: "book does not exist" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete route
let deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(500).json({ message: "Invalid id" });
    }

    const book = await Books.findByIdAndDelete({ _id: id });
    if (!book) {
      return res.status(404).json({ message: "the book  does not exist" });
    }
    res.status(200).json({ message: "book is deleted", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// //----------------------------------Base uri reponse------------------------------------------

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
};
