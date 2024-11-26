const express = require('express');
const path = require('path');
const Article = require('../models/Aricle');

// Create Article
exports.createArticle = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ success: false, message: 'Title and description are required.' });
      return;
    }

    // Check if an image was uploaded
    let image = null;
    if (req.file) {
      image = path.join('uploads/articles', req.file.filename); // Construct the file path
    } else {
      res.status(400).json({ success: false, message: 'Image is required.' });
      return;
    }

    // Create the article with the image path
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
exports.getAllArticles = async (req, res, next) => {
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
exports.getArticleById = async (req, res, next) => {
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
exports.updateArticle = async (req, res, next) => {
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
exports.deleteArticle = async (req, res, next) => {
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
