import User from "../../../../lib/models/user.model";
import { connect } from "../../../../lib/mongodb/mongoose";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await connect();

    // Request থেকে JSON data পার্স করা
    const { userId, adsLink } = await req.json();

    console.log({userId, adsLink})

    // Check if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(
        JSON.stringify({ error: "Invalid user ID format" }),
        { status: 400 }
      );
    }

    if (!adsLink) {
      return new Response(
        JSON.stringify({ error: "adsLink is required" }),
        { status: 400 }
      );
    }

    // User খুঁজে বের করে `adsLink` আপডেট করা
    const updatedUser = await User.findByIdAndUpdate(
      userId, // যাকে খুঁজবো
      { $set: { adsLink } }, // নতুন ফিল্ড যুক্ত করবো
      { new: true, runValidators: true } // Updated ডাটা ফেরত আসবে
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to update user data" }),
      { status: 500 }
    );
  }
};
