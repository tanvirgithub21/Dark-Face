import { useState } from "react";

export function useUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const uploadFile = async (file, text, user) => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file); // ফাইল পাঠানো হচ্ছে
    formData.append("text", text); // ✅ টেক্সট
    formData.append("name", user.fullName);
    formData.append("username", user.username);
    formData.append("profileImg", user.imageUrl);
    formData.append("userMongoId", user.publicMetadata.userMongoId);

    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      return data; // Cloudinary থেকে পাওয়া ফাইলের URL
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
}
