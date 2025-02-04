// File: /app/api/cloudinary-config/[dbName]/route.js

import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import CloudinaryConfig from "@/lib/models/db.model";

export async function PUT(req, { params }) {
  const { dbName } = params; // Get dbName from the URL params
  console.log("API Call: Updating CloudinaryConfig Data for dbName:", dbName);

  // Database Connect
  await connect();

  try {
    // Request Body থেকে ডাটা পাওয়া
    const { cloudName, apiKey, apiSecret, email } = await req.json();

    // Find and update the document with the matching dbName
    const updatedConfig = await CloudinaryConfig.findOneAndUpdate(
      { dbName },
      { cloudName, apiKey, apiSecret, email },
      { new: true } // To return the updated document
    );

    if (!updatedConfig) {
      return NextResponse.json(
        { message: "Config not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "CloudinaryConfig updated successfully!", data: updatedConfig },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
