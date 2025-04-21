import mongoose from "mongoose";
import { env } from "@/lib/env";

let isConnected = false; // Track the connection state

export const connectToMongo = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    return mongoose;
  }

  if (!env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  try {
    const db = await mongoose.connect(env.MONGODB_URI);
    isConnected = true;
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
