// File: /app/api/cloudinary-config/route.js

import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import CloudinaryConfig from "@/lib/models/db.model";

export async function GET(req) {
  console.log("API Call: Fetching all CloudinaryConfig Data");

  // Database Connect
  await connect();

  try {
    // Find all CloudinaryConfig documents
    const configs = await CloudinaryConfig.find();

    if (configs.length === 0) {
      return NextResponse.json(
        { message: "No CloudinaryConfig found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "All CloudinaryConfig found successfully!", data: configs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
