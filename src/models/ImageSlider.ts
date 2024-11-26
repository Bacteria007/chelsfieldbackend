import { Document, model, Schema } from "mongoose";

// Define TypeScript interface for Slider Image
export interface SliderImageInterface extends Document {
    imageUrl: string;
    createdAt: Date;
}

// Create Mongoose Schema
const SliderImageSchema = new Schema<SliderImageInterface>({
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v),
            message: (props: { value: string }) => `${props.value} is not a valid image URL!`,
        },
    },
      createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
export const ImageSlider= model<SliderImageInterface>('SliderImage', SliderImageSchema);
