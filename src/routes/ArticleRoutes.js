import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";
import fs from "fs";
import path from "path";
import { uploadImage } from "../middleware/uploadfile";

const ArticlesRouter = Router();

// Ensure the directory exists
const uploadPath = path.join(__dirname, "../uploads/articles");
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

export default ArticlesRouter;
