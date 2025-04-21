import type { PlantationType } from "@/lib/types";
import mongoose from "mongoose";

const { models, Schema, model } = mongoose;

const schema = new Schema(
  {
    course: String,
    user: String,
    plants: Number,
    slug: String,
    images: [{ url: String, publicId: String }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Plantations =
  models.Plantation<PlantationType> ||
  model<PlantationType>("Plantation", schema);
