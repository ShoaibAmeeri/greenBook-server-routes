const News = require("../model/news");
const { default: mongoose } = require("mongoose");

let createNews = async (req, res) => {
  try {
    const { image, description } = req.body;
    const err = [];
    
    if (!image) {
      err.push("image is required");
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

    const newsExist = await News.findOne({ image: image });
    if (newsExist) {
      return res.status(400).json({ msg: "news has been already in gallary" });
    }
    const news = new News({  image, description });
    news.save();
    res.status(200).json({ data: news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get route for users
let getNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get route single book
let getNew = async (req, res) => {
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
let deleteNews = async (req, res) => {
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
  getNews,
  getNew,
  deleteNews,
  createNews
};
