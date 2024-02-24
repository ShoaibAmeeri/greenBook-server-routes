const express = require("express");
const {
  getNews,
  getNew,
  createNews,
  deleteNews,
} = require("../controler/news");

const router = express.Router();

router.post("/", createNews);
router.get("/", getNews);
router.get("/:id", getNew);
router.delete("/:id", deleteNews);

// //----------------------------------Base uri reponse------------------------------------------

module.exports = router;
