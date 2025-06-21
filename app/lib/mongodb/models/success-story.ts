import type { ApprovalStatus } from "@/lib/types";
import mongoose from "mongoose";

const { models, Schema, model } = mongoose;

export type SuccessStoryType = {
  _id?: string;
  name: string;
  role: "student" | "trainer" | "volunteer" | "admirer";
  company?: string;
  designation?: string;
  content: string;
  employed?: boolean;
  batch?: string;
  trainer?: string;
  course?: string;
  status?: ApprovalStatus | string;
  linkedin?: string;
  createdAt: Date;
  updatedAt: Date;
};

const schema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "trainer", "volunteer", "admirer"],
      required: true,
    },
    company: { type: String },
    designation: { type: String },
    content: { type: String, required: true },
    employed: { type: Boolean },
    batch: { type: String },
    course: { type: String },
    trainer: { type: String },
    status: {
      type: String,
      default: "pending",
    },
    linkedin: String,
  },
  {
    timestamps: true,
  }
);

export const SuccessStory =
  models.SuccessStory<SuccessStoryType> ||
  model<SuccessStoryType>("SuccessStory", schema);
