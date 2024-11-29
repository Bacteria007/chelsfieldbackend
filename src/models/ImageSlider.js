const mongoose = require("mongoose");

const SliderImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageSlider = mongoose.model("SliderImage", SliderImageSchema);

module.exports = { ImageSlider };
