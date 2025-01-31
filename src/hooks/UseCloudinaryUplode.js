import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false, // `formData` ব্যবহার করার জন্য `bodyParser` বন্ধ রাখা
  },
};

// Cloudinary কনফিগারেশন
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const checkUrlType = (data) => {
  // ভিডিও ফরম্যাটের এক্সটেনশন
  const videoExtensions = /\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i;
  // ইমেজ ফরম্যাটের এক্সটেনশন
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

  if (videoExtensions.test(data?.secure_url)) {
    return data?.playback_url;
  } else if (imageExtensions.test(data?.secure_url)) {
    return data?.secure_url;
  }
};

// ✅ **নতুন ফাংশন: ফাইল Cloudinary-তে আপলোড করা**
export default async function processFileUpload(req) {
  try {
    const formData = await req.formData(); // ✅ Next.js App Router-এর জন্য `formData` ব্যবহার
    const file = formData.get("file"); // ✅ ফর্ম থেকে ফাইল নেওয়া
    const text = formData.get("text"); // পোস্ট টেক্সট
    const name = formData.get("name"); // ইউজারের নাম
    const username = formData.get("username"); // ইউজারনেম
    const profileImg = formData.get("profileImg"); // প্রোফাইল ইমেজ
    const userMongoId = formData.get("userMongoId"); // ইউজার ID

    console.log({ text, name, userMongoId, username, profileImg });

    if (!file) {
      throw new Error("No file provided");
    }

    // **Buffer এ ফাইল রিড করা**
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // **Cloudinary-তে আপলোড করার জন্য ফাইল লোকাল স্টোরেজে রাখতে হবে**
    const uploadedUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: "Dark-Face" },
          (error, result) => {
            if (error) reject(error);
            else {
              resolve(checkUrlType(result));
            }
          }
        )
        .end(buffer);
    });

    return { text, name, userMongoId, username, profileImg, uploadedUrl };
  } catch (error) {
    throw new Error("File upload failed: " + error.message);
  }
}
