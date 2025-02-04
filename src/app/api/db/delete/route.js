// File: /app/api/cloudinary-config/[dbName]/route.js

import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import CloudinaryConfig from "@/lib/models/db.model";

export async function DELETE(req, { params }) {
  const { dbName } = params; // Get dbName from the URL params
  console.log("API Call: Deleting CloudinaryConfig Data for dbName:", dbName);

  // Database Connect
  await connect();

  try {
    // Find and delete the document with the matching dbName
    const deletedConfig = await CloudinaryConfig.findOneAndDelete({ dbName });

    if (!deletedConfig) {
      return NextResponse.json(
        { message: "Config not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "CloudinaryConfig deleted successfully!", data: deletedConfig },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
