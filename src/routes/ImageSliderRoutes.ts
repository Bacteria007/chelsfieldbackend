import express from 'express';
import {
  createSliderImage,
  getAllSliderImages,
  getSliderImageById,
  updateSliderImage,
  deleteSliderImage,
} from '../controllers/SliderController';

const SliderRouter = express.Router();

SliderRouter.post('/slider', createSliderImage);
SliderRouter.get('/slider', getAllSliderImages);
SliderRouter.get('/slider/:id', getSliderImageById);
SliderRouter.put('/slider/:id', updateSliderImage);
SliderRouter.delete('/slider/:id', deleteSliderImage);

export default SliderRouter;
