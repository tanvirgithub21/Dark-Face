import mongoose from "mongoose";
import Post from "@/lib/models/post.model";
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";

export async function GET(req) {
  console.log("Fetching posts by user...");

  // Database Connect
  await connect();

  try {
    const { searchParams } = new URL(req.url);
    let userId = searchParams.get("userId"); // ইউজার আইডি নেওয়া
    let excludeIds = searchParams.get("excludeIds");
    excludeIds = excludeIds ? JSON.parse(excludeIds) : [];

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // ইউজারের নির্দিষ্ট পোস্ট বের করা
    const posts = await Post.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // ইউজারের পোস্ট
          _id: { $nin: excludeIds.map((id) => new mongoose.Types.ObjectId(id)) }, // exclude করা পোস্ট বাদ
        },
      },
      { $sort: { createdAt: -1 } }, // নতুন পোস্ট আগে দেখাবে
      { $limit: 5 }, // প্রতি রিকোয়েস্টে ৫টি পোস্ট পাঠাবে
    ]);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
