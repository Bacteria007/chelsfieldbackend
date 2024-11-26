const mongoose = require("mongoose");

const SliderImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v),
      message: (props) => `${props.value} is not a valid image URL!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageSlider = mongoose.model("SliderImage", SliderImageSchema);

module.exports = { ImageSlider };
