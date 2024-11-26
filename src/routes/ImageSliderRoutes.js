const express = require("express");
const path=require('path')
const fs=require('fs')
const SliderRouter = express.Router();

const {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
} = require("../controllers/SliderController");
const { uploadImage } = require("../middleware/uploadfile");


// Ensure the directory exists
const uploadPath = path.join(__dirname, "../uploads/slider");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Middleware for image upload
const uploadMiddleware = uploadImage(uploadPath);

SliderRouter.post('/slider-image', uploadMiddleware,createSliderImage);
SliderRouter.get('/slider', getAllSliderImages);
SliderRouter.get('/slider/:id', getSliderImageById);
SliderRouter.put('/slider/:id', updateSliderImage);
SliderRouter.delete('/slider/:id', deleteSliderImage);

module.exports = SliderRouter;
