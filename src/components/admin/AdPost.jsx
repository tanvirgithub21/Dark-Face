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

  const handleSubmit = async () => {
    console.log({ category, script });
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
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
}
