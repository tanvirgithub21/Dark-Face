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
      { $sample: { size: 5 } }, // Randomly 10 post select
    ]);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}


// import mongoose from "mongoose";
// import Post from "@/lib/models/post.model";
// import { NextResponse } from "next/server";
// import { connect } from "@/lib/mongodb/mongoose";

// // Random US Girl Names
// const usGirlNames = [
//   "Emma Johnson",
//   "Olivia Smith",
//   "Ava Williams",
//   "Sophia Brown",
//   "Isabella Jones",
//   "Mia Miller",
//   "Charlotte Davis",
//   "Amelia Wilson",
//   "Harper Anderson",
//   "Evelyn Thomas",
//   "Abigail White",
//   "Ella Harris",
//   "Scarlett Martin",
//   "Grace Thompson",
//   "Lily Garcia",
//   "Hannah Martinez",
//   "Aria Robinson",
//   "Madison Clark",
//   "Chloe Rodriguez",
//   "Aubrey Lewis",
//   "Zoey Walker",
//   "Nora Hall",
//   "Layla Allen",
//   "Riley Young",
//   "Victoria King",
//   "Stella Wright",
//   "Lucy Scott",
//   "Natalie Green",
//   "Penelope Adams",
//   "Brooklyn Nelson",
// ];


// function getRandomName() {
//   return usGirlNames[Math.floor(Math.random() * usGirlNames.length)];
// }

// // Update null or "null" names
// export async function PATCH(req) {
//   await connect();
//   try {
//     const posts = await Post.find({ name: { $in: [null, "null"] } });

//     if (!posts.length) {
//       return NextResponse.json({ message: "No posts to update" }, { status: 200 });
//     }

//     // Update each post with a random US girl name
//     for (let post of posts) {
//       post.name = getRandomName();
//       await post.save();
//     }

//     return NextResponse.json({ message: "Updated successfully", updatedCount: posts.length }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Server Error", error }, { status: 500 });
//   }
// }
