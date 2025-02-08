import mongoose from "mongoose";
import Post from "@/lib/models/post.model";
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";

// Random US Girl Names
const usGirlNames = [
  "Emma Johnson",
  "Olivia Smith",
  "Ava Williams",
  "Sophia Brown",
  "Isabella Jones",
  "Mia Miller",
  "Charlotte Davis",
  "Amelia Wilson",
  "Harper Anderson",
  "Evelyn Thomas",
  "Abigail White",
  "Ella Harris",
  "Scarlett Martin",
  "Grace Thompson",
  "Lily Garcia",
  "Hannah Martinez",
  "Aria Robinson",
  "Madison Clark",
  "Chloe Rodriguez",
  "Aubrey Lewis",
  "Zoey Walker",
  "Nora Hall",
  "Layla Allen",
  "Riley Young",
  "Victoria King",
  "Stella Wright",
  "Lucy Scott",
  "Natalie Green",
  "Penelope Adams",
  "Brooklyn Nelson",
];

const profileUrls = [
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016462/avatar_rx6c1d.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016458/avatar_sch2ao.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016453/avatar_hwv1vp.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016448/avatar_faak8v.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016445/avatar_g7yhn1.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016440/avatar_varabj.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016419/avatar_qlljkf.jpg",
  "https://res.cloudinary.com/diffa62d6/image/upload/v1739016414/avatar_v8qr3u.jpg",
];

function getRandomName() {
  return usGirlNames[Math.floor(Math.random() * usGirlNames.length)];
}

function getRandomProfileImg() {
  return profileUrls[Math.floor(Math.random() * profileUrls.length)];
}

// Update all profileImg and name if needed
export async function GET(req) {
  await connect();
  try {
    const posts = await Post.find({}); // Fetch all posts

    if (!posts.length) {
      return NextResponse.json({ message: "No posts found" }, { status: 200 });
    }

    // Update each post with a new random profile image and name if needed
    for (let post of posts) {
      if (!post.name || post.name === "null") {
        post.profileImg = getRandomProfileImg(); // Always update profileImg
        post.name = getRandomName(); // Only update name if null
      }
      await post.save();
    }

    return NextResponse.json(
      { message: "Updated successfully", updatedCount: posts.length },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
