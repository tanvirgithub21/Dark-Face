import { clerkClient } from "@clerk/nextjs/server";
import User from "../../../../lib/models/user.model";
import { connect } from "../../../../lib/mongodb/mongoose";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await connect();

    // Request থেকে JSON data পার্স করা
    const { userId, adsLink } = await req.json();


    if (!userId || !adsLink) {
      return new Response(
        JSON.stringify({ error: "userId and adsLink are required" }),
        { status: 400 }
      );
    }

    // MongoDB এর জন্য ObjectId চেক করা (Clerk-এর userId নয়)
    if (mongoose.Types.ObjectId.isValid(userId)) {
      // User খুঁজে বের করে `adsLink` আপডেট করা
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { adsLink } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        console.log("error");
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }

      // Clerk-এর user metadata আপডেট করা
      try {
        console.log(updatedUser)
        const client = await clerkClient();
        await client.users.updateUserMetadata(updatedUser.clerkId, {
          publicMetadata: {
            adsLink: adsLink,
          },
        });

        console.log("User metadata updated in Clerk");
      } catch (error) {
        console.error("Error updating Clerk user metadata:", error);
      }
    }

    return new Response(
      JSON.stringify({ message: "User data updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating user:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to update user data" }),
      { status: 500 }
    );
  }
};
