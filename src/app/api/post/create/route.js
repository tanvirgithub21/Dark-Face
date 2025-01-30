import Post from "../../../../lib/models/post.model.js";
import { connect } from "../../../../lib/mongodb/mongoose.js";
import { currentUser } from "@clerk/nextjs/server";
import processFileUpload from "@/hooks/UseCloudinaryUplode.js";

export const POST = async (req) => {
  const user = await currentUser();
  try {
    const { text, name, userMongoId, username, profileImg, uploadedUrl } =
      await processFileUpload(req);

    await connect();

    if (!user || user.publicMetadata.userMongoId !== userMongoId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const newPost = await Post.create({
      user: userMongoId,
      name: name,
      username: username,
      text: text,
      profileImg: profileImg,
      uploadedUrl: uploadedUrl,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log("Error creating post:", error);
    return new Response("Error creating post", {
      status: 500,
    });
  }
};
