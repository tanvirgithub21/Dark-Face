import { useState } from "react";

export default function CloudinaryConfigForm() {
  const [formData, setFormData] = useState({
    cloudName: "",
    apiKey: "",
    apiSecret: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/db/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Configuration Saved!");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Server Error, Please try again later!");
      console.error("Error saving configuration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Cloudinary Configuration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm">
            Cloud Name
          </label>
          <input
            type="text"
            name="cloudName"
            value={formData.cloudName}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Enter Cloudinary Cloud Name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm">
            API Key
          </label>
          <input
            type="text"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Enter Cloudinary API Key"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm">
            API Secret
          </label>
          <input
            type="text"
            name="apiSecret"
            value={formData.apiSecret}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Enter Cloudinary API Secret"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Enter Email"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg transition ${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white dark:text-gray-200"
          }`}
        >
          {loading ? "Loading..." : "Save Configuration"}
        </button>
      </form>
    </div>
  );
}
