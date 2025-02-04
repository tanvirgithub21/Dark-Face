import mongoose from "mongoose";

const dbSchema = new mongoose.Schema(
  {
    file: {
      type: Number,
      default: 0, // Default value 0
    },
    dbName: {
      type: String,
      unique: true,
    },
    status: {
      type: Boolean,
      default: false, // Default value false
    },
    cloudName: {
      type: String,
      required: true,
      unique: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    apiSecret: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const CloudinaryConfig = mongoose.models.CloudinaryConfig || mongoose.model("CloudinaryConfig", dbSchema);

export default CloudinaryConfig;
