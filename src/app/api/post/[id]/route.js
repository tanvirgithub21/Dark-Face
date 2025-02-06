import Post from "../../../../lib/models/post.model";
import { connect } from "../../../../lib/mongodb/mongoose";
import { ObjectId } from "mongodb"; 

export const GET = async (req, { params }) => {
  console.log("server...");

  try {
    // **MongoDB সংযোগ স্থাপন**
    await connect();

    // **URL থেকে ID নেওয়া**
    const { id } = await params; 

    if (!id || !ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing Post ID" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // **ডাটাবেজ থেকে নির্দিষ্ট পোস্ট খোঁজা**
    const post = await Post.findById(id);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error getting post:", error);
    return new Response(JSON.stringify({ error: "Error getting post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
