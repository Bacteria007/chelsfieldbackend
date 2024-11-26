import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";

const ArticlesRouter = Router();

ArticlesRouter.post("/articles", createArticle); // Create an article
ArticlesRouter.get("/articles", getAllArticles); // Get all articles
ArticlesRouter.get("/articles/:id", getArticleById); // Get an article by ID
ArticlesRouter.put("/articles/:id", updateArticle); // Update an article
ArticlesRouter.delete("/articles/:id", deleteArticle); // Delete an article

export default ArticlesRouter;
