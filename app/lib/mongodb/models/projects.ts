import mongoose from "mongoose";

export type ProjectType = {
  _id?: any;
  name: string;
  description: string;
  language: string;
  link: string;
  courseId: number;
  userId?: number;
  author: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  authorAvatar: string;
};

// Define a schema that matches the ProjectType (excluding _id)
const schema = new mongoose.Schema<ProjectType>(
  {
    courseId: { type: Number, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    name: { type: String, required: true },
    userId: { type: Number, required: false },
    link: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatar: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Ensure model type safety
export const Projects: mongoose.Model<ProjectType> =
  mongoose.models.Project || mongoose.model<ProjectType>("Project", schema);
