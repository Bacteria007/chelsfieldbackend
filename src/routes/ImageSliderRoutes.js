const express = require("express");
const fs = require("fs");
const SliderRouter = express.Router();
const { sliderImagePath } = require("../utils/constants");

const {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
} = require("../controllers/SliderController");
const { uploadImage } = require("../middleware/uploadfile");

// Ensure the directory exists
if (!fs.existsSync(sliderImagePath)) {
  fs.mkdirSync(sliderImagePath, { recursive: true });
}

// Middleware for image upload
const uploadMiddleware = (req, res, next) => {
  uploadImage(sliderImagePath, [{ name: "image", maxCount: 1 }])(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_TYPES") {
        return res.status(400).json({ message: err.message, success: false });
      }
      return res.status(500).json({ message: "File upload error", success: false });
    }
    next();
  });
};

// Routes
SliderRouter.post("/upload-slider-image", uploadMiddleware, createSliderImage);
SliderRouter.get("/get-slider-images", getAllSliderImages);
SliderRouter.get("/slider/:id", getSliderImageById);
SliderRouter.put("/slider/:id", updateSliderImage);
SliderRouter.delete("/slider/:id", deleteSliderImage);

module.exports = SliderRouter;
