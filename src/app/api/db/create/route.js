import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import CloudinaryConfig from "@/lib/models/db.model";

export async function POST(req) {
  console.log("API Call: Saving CloudinaryConfig Data");

  // Database Connect
  await connect();

  try {
    // Request Body থেকে ডাটা পাওয়া
    const { cloudName, apiKey, apiSecret, email } = await req.json();

    if (!cloudName || !apiKey || !apiSecret || !email) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    // নতুন dbName জেনারেট করা ফাংশন
    async function generateUniqueDbName() {
      let unique = false;
      let newDbName = "";
      while (!unique) {
        newDbName = `DB${Math.floor(1000 + Math.random() * 9000)}`; // DBXXXX ফরম্যাট
        const existing = await CloudinaryConfig.findOne({ dbName: newDbName });
        if (!existing) unique = true;
      }
      return newDbName;
    }

    // নতুন dbName সেট করা
    const dbName = await generateUniqueDbName();

    // নতুন কনফিগ তৈরি করা
    const newConfig = new CloudinaryConfig({
      file: 0, // Default value
      dbName,
      status: false, // Default value
      cloudName,
      apiKey,
      apiSecret,
      email,
    });

    // ডাটা সেভ করা
    await newConfig.save();

    return NextResponse.json(
      { message: "Cloudinary Config Saved Successfully!", data: newConfig },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
