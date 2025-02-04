import { v2 as cloudinary } from "cloudinary";
import CloudinaryConfig from "@/lib/models/db.model"; // আপনার CloudinaryConfig মডেল
import { connect } from "@/lib/mongodb/mongoose"; // MongoDB সংযোগ

export const config = {
  api: {
    bodyParser: false, // `formData` ব্যবহার করার জন্য `bodyParser` বন্ধ রাখা
  },
};

// ফাইল টাইপ চেক করা
const checkUrlType = (data) => {
  const videoExtensions = /\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i;
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

  if (videoExtensions.test(data?.secure_url)) {
    return data?.playback_url;
  } else if (imageExtensions.test(data?.secure_url)) {
    return data?.secure_url;
  }
};

// ✅ ফাইল আপলোড করার ফাংশন
export default async function processFileUpload(req) {
  try {
    const formData = await req.formData(); // ফর্ম ডাটা নিন
    const file = formData.get("file"); // ফাইল
    const text = formData.get("text"); // পোস্ট টেক্সট
    const name = formData.get("name"); // ইউজারের নাম
    const username = formData.get("username"); // ইউজারনেম
    const profileImg = formData.get("profileImg"); // প্রোফাইল ছবি
    const userMongoId = formData.get("userMongoId"); // ইউজারের MongoDB আইডি

    if (!file) {
      throw new Error("No file provided");
    }

    // **ডাটাবেস থেকে কনফিগ নির্বাচন করা**
    await connect();
    const config = await CloudinaryConfig.findOne({ status: true });

    if (!config) {
      throw new Error("No active Cloudinary configuration found!");
    }

    // **Cloudinary কনফিগ সেট করা ডাটাবেস থেকে**
    cloudinary.config({
      cloud_name: config.cloudName, // cloudName ডাটাবেস থেকে
      api_key: config.apiKey, // apiKey ডাটাবেস থেকে
      api_secret: config.apiSecret, // apiSecret ডাটাবেস থেকে
    });

    // **Buffer এ ফাইল রিড করা**
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // **Cloudinary-তে ফাইল আপলোড করা**
    const promiseResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: "Dark-Face" },
          (error, result) => {
            if (error) reject(error);
            else {
              const uploadedUrl = checkUrlType(result);
              const { resource_type, width, height } = result;
              const finalResult = { uploadedUrl, resource_type, width, height };
              resolve(finalResult);
            }
          }
        )
        .end(buffer);
    });

    // ফাইল আপলোড হলে ডাটাবেসের ফাইল কাউন্ট বাড়ানো
    config.file += 1;

    // ফাইল কাউন্ট 50 হলে স্ট্যাটাস পরিবর্তন করা
    if (config.file >= 50) {
      // স্ট্যাটাস False করা
      config.status = false;
      await config.save();

      // নতুন Active কনফিগ খুঁজে বের করা যেখানে status: false এবং file count 50 এর নিচে
      const newConfig = await CloudinaryConfig.findOne({
        status: false,
        file: { $lt: 50 }, // file count 50 এর নিচে হতে হবে
      });

      if (!newConfig) {
        throw new Error("No available space for new active configuration in the database.");
      }

      // নতুন কনফিগের স্ট্যাটাস True করা
      newConfig.status = true;
      newConfig.file = 0; // নতুন কনফিগের ফাইল কাউন্ট 0 সেট করা
      await newConfig.save();
    }

    // ডাটাবেস আপডেট করা
    await config.save();

    // রিটার্ন ডাটা
    return {
      text,
      name,
      userMongoId,
      username,
      profileImg,
      ...promiseResult,
    };
  } catch (error) {
    throw new Error("File upload failed: " + error.message);
  }
}
