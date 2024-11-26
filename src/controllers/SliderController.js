import { Request, Response, NextFunction, RequestHandler } from "express";
import { ImageSlider } from "../models/ImageSlider";

// Create Slider Image
export const createSliderImage = async (req, res, next) => {
    try {
      // Check if the file was uploaded
      if (!req.file) {
        res.status(400).json({ success: false, message: "Image is required." });
        return;
      }
  
      // Construct the image path
      const imageUrl = path.join("uploads/slider", req.file.filename);
  
      // Create a new slider image entry
      const sliderImage = new ImageSlider({ imageUrl });
      await sliderImage.save();
  
      res.status(201).json({
        success: true,
        message: "Slider image created successfully.",
        data: sliderImage,
      });
    } catch (error) {
      next(error);
    }
  };

// Get all Slider Images
export const getAllSliderImages = async (
    req,
    res,
    next
) => {
    try {
        const sliderImages = await ImageSlider.find();

        res.status(200).json({
            success: true,
            message: "Slider images fetched successfully.",
            data: sliderImages,
        });
    } catch (error) {
        next(error);
    }
};

// Get Slider Image by ID
export const getSliderImageById = async (
    req,
    res,
    next
) => {
    try {
        const { id } = req.params;
        const sliderImage = await ImageSlider.findById(id);

        if (!sliderImage) {
            res.status(404).json({
                success: false,
                message: "Slider image not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Slider image fetched successfully.",
            data: sliderImage,
        });
    } catch (error) {
        next(error);
    }
};

// Update Slider Image
export const updateSliderImage = async (
    req,
    res,
    next
) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;

        if (!imageUrl) {
            res
                .status(400)
                .json({ success: false, message: "Please provide a valid image URL." });
            return;
        }

        const updatedSliderImage = await ImageSlider.findByIdAndUpdate(
            id,
            { imageUrl },
            { new: true }
        );

        if (!updatedSliderImage) {
            res.status(404).json({
                success: false,
                message: "Slider image not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Slider image updated successfully.",
            data: updatedSliderImage,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Slider Image
export const deleteSliderImage = async (
    req,
    res,
    next
) => {
    try {
        const { id } = req.params;

        const deletedSliderImage = await ImageSlider.findByIdAndDelete(id);

        if (!deletedSliderImage) {
            res.status(404).json({
                success: false,
                message: "Slider image not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Slider image deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};
