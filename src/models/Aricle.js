const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } } // Enable `createdAt`
);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = { Article };
