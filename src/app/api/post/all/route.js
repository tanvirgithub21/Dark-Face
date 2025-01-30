import mongoose from "mongoose";
import Post from "@/lib/models/post.model";
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";

export async function GET(req) {
  console.log("call");
  // Database Connect
  await connect();
  try {
    const { searchParams } = new URL(req.url);
    let excludeIds = searchParams.get("excludeIds");
    excludeIds = excludeIds ? JSON.parse(excludeIds) : [];

    // Randomly 10 Post Select Kora
    const posts = await Post.aggregate([
      {
        $match: {
          _id: {
            $nin: excludeIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      }, // Already fetched posts exclude
      { $sort: { createdAt: -1 } }, // Notun post priority pabe
      { $sample: { size: 3 } }, // Randomly 10 post select
    ]);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
