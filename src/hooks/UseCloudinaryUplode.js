import { v2 as cloudinary } from "cloudinary";
import CloudinaryConfig from "@/lib/models/db.model"; // Your CloudinaryConfig model
import { connect } from "@/lib/mongodb/mongoose"; // MongoDB connection

export const config = {
  api: {
    bodyParser: false, // Disable `bodyParser` to use `formData`
  },
};

// Check file type
const checkUrlType = (data) => {
  const videoExtensions = /\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i;
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

  return videoExtensions.test(data?.secure_url)
    ? data?.playback_url
    : imageExtensions.test(data?.secure_url)
    ? data?.secure_url
    : null;
};

// ✅ Function to handle file upload
export default async function processFileUpload(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const text = formData.get("text");
    const name = formData.get("name");
    const username = formData.get("username");
    const profileImg = formData.get("profileImg");
    const userMongoId = formData.get("userMongoId");

    if (!file) throw new Error("No file provided, please upload a file.");

    // **Retrieve configuration from the database**
    await connect();
    let config = await CloudinaryConfig.findOne({ status: true });

    if (!config) {
      config = await CloudinaryConfig.findOneAndUpdate(
        { file: { $lt: 50 }, status: false },
        { status: true },
        { new: true }
      );
      if (!config) throw new Error("Upload limit exceeded! Please add a new configuration.");
    }

    // **Set Cloudinary config from the database**
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });

    // **Read file into a buffer**
    const buffer = Buffer.from(await file.arrayBuffer());

    // **Upload file to Cloudinary**
    const promiseResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "Dark-Face" },
        (error, result) => {
          if (error) reject(error);
          else resolve({
            uploadedUrl: checkUrlType(result),
            resource_type: result.resource_type,
            width: result.width,
            height: result.height,
          });
        }
      ).end(buffer);
    });

    // **Increment file count in MongoDB**
    const updatedConfig = await CloudinaryConfig.findByIdAndUpdate(
      config._id,
      { $inc: { file: 1 } },
      { new: true }
    );

    // **Handle file limit exceeded case**
    if (updatedConfig.file >= 50) {
      await CloudinaryConfig.findByIdAndUpdate(updatedConfig._id, { status: false });
      const newConfig = await CloudinaryConfig.findOneAndUpdate(
        { status: false, file: { $lt: 50 } },
        { status: true, file: 0 },
        { new: true }
      );
      if (!newConfig) throw new Error("Upload limit exceeded! Please add a new configuration.");
    }

    // Return success response
    return {
      message: "File uploaded successfully!",
      text,
      name,
      userMongoId,
      username,
      profileImg,
      ...promiseResult,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to upload file. Please try again.");
  }
}
