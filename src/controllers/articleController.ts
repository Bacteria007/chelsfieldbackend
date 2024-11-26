import { RequestHandler } from 'express';
import { Article } from '../models/Aricle';

// Create Article
export const createArticle: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      res.status(400).json({ success: false, message: 'All fields are required.' });
      return;
    }

    const article = new Article({ title, image, description });
    await article.save();

    res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Articles
export const getAllArticles: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const articles = await Article.find();

    res.status(200).json({
      success: true,
      message: 'Articles fetched successfully.',
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

// Get Article by ID
export const getArticleById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Article fetched successfully.',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// Update Article
export const updateArticle: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      res.status(400).json({ success: false, message: 'All fields are required.' });
      return;
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true }
    );

    if (!updatedArticle) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Article updated successfully.',
      data: updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Article
export const deleteArticle: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
