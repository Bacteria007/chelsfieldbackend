import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  image: string;
  description: string;
  createdAt: Date;
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } } // Enable `createdAt`
);

export const Article = mongoose.model<IArticle>("Article", ArticleSchema);
