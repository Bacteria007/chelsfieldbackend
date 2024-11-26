const express = require("express");
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/ArticleController.js");
const fs = require("fs");
const path = require("path");
const { uploadImage } = require("../middleware/uploadfile.js");

const ArticlesRouter = express.Router();
// Ensure the directory exists
const uploadPath = path.join(__dirname, "../uploads/articles.js");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Middleware for image upload
const uploadMiddleware = uploadImage(uploadPath);

ArticlesRouter.post("/articles", uploadMiddleware, createArticle); // Create an article
ArticlesRouter.get("/articles", getAllArticles); // Get all articles
ArticlesRouter.get("/articles/:id", getArticleById); // Get an article by ID
ArticlesRouter.put("/articles/:id", updateArticle); // Update an article
ArticlesRouter.delete("/articles/:id", deleteArticle); // Delete an article

module.exports = ArticlesRouter;
