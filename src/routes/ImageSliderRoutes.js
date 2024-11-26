import express from 'express';
import {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
} from '../controllers/SliderController';
import { uploadImage } from '../middleware/uploadfile';

const SliderRouter = express.Router();

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

export default SliderRouter;
