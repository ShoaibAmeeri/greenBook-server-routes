const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

  image: {
    type: String,
    require,
  },

  description: {
    type: String,
    require: true,
  },
  isAvail: {
    type: Boolean,
    require: true,
  },
});
const News = mongoose.model("News", newsSchema);
module.exports = News;
