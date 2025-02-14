"use client";
import React, { useState } from "react";

function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border p-3 w-full mb-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function TextAreaInput({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="border p-3 w-full mb-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm"
      placeholder={placeholder}
    ></textarea>
  );
}

export default function AdPost() {
  const [category, setCategory] = useState("");
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error state

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    setError(""); // Reset previous error message
    try {
      // Prepare the data to send to the server
      const adData = {
        ad_script: script,
        category: category,
      };

      // Make the API request
      const response = await fetch("/api/ads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adData),
      });

      // Check if the response is successful
      if (response.ok) {
        const result = await response.json();
        // Optionally, reset the form or show a success message
        setCategory("");
        setScript("");
      } else {
        console.error("Failed to post ad:", response.statusText);
        setError("Failed to post ad. Please try again later.");
      }
    } catch (error) {
      console.error("Error posting ad:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Create an Ad Post
      </h1>
      <SelectInput
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={[
          { value: "", label: "Choose Category" },
          { value: "Tech", label: "Tech" },
          { value: "Business", label: "Business" },
        ]}
      />
      <TextAreaInput
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter ad script"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleSubmit}
        className={`w-full ${isLoading ? "bg-gray-400" : "bg-blue-500"} text-white px-4 py-2 rounded`}
        disabled={isLoading}
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
