import type { ApprovalStatus } from "@/lib/types";
import mongoose, { Model } from "mongoose";

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
  status?: string | ApprovalStatus;
};

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
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: true,
  }
);

export const Projects: Model<ProjectType> =
  (mongoose.models?.Project as Model<ProjectType>) ||
  mongoose.model<ProjectType>("Project", schema);
