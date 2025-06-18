import mongoose, { type ObjectId } from "mongoose";

const { models, Schema, model } = mongoose;

type SuccessStoryStatus = "pending" | "approved" | "declined";

export type SuccessStoryType = {
  _id?: ObjectId | string;
  name: string;
  role: "student" | "trainer" | "volunteer" | "admirer";
  company?: string;
  designation?: string;
  content: string;
  employed?: boolean;
  batch?: string;
  trainer?: string;
  status: SuccessStoryStatus;
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
    trainer: { type: String },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const SuccessStory =
  models.SuccessStory<SuccessStoryType> ||
  model<SuccessStoryType>("SuccessStory", schema);
