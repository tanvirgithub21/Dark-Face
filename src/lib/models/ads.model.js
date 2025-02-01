import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      require: true,
    },
    ad_script: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Ad = mongoose.models.Ad || mongoose.model("Ad", adSchema);

export default Ad;
