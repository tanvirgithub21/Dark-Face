import User from "../../../../lib/models/user.model";
import { connect } from "../../../../lib/mongodb/mongoose";
import mongoose from "mongoose";

export const GET = async (req) => {
  try {
    await connect();

    // ✅ URL থেকে userId নেওয়া
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // ✅ userId ভ্যালিড কিনা চেক করা
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ error: "Invalid user ID format" }), {
        status: 400,
      });
    }

    // ✅ ইউজার খোঁজা (শুধু প্রয়োজনীয় ফিল্ড রিটার্ন করবে)
    const user = await User.findById(userId);

    // ✅ ইউজার না পেলে Error রিটার্ন
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch user data" }),
      { status: 500 }
    );
  }
};
