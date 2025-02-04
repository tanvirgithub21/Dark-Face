import Post from "../../../../lib/models/post.model.js";
import { connect } from "../../../../lib/mongodb/mongoose.js";
import { currentUser } from "@clerk/nextjs/server";
import processFileUpload from "@/hooks/UseCloudinaryUplode.js";

export const POST = async (req) => {
  const user = await currentUser();


  const videoTitles = [
    "The Timeless Beauty of American Women 🇺🇸✨ | Elegance, Confidence & Charm",
    "Grace & Glamour: The Stunning Beauty of American Women 🇺🇸✨",
    "Charming & Confident: The Elegance of American Women 💃✨",
    "Radiant & Bold: The Beauty of American Women 🇺🇸💖",
    "Timeless Allure: The Enchanting Beauty of American Women ✨😍",
    "Flawless & Fearless: The True Beauty of American Women 🇺🇸🔥",
    "Dazzling & Divine: The Irresistible Beauty of American Women ✨💃",
    "Elegance & Strength: The Power of American Women's Beauty 🇺🇸💖",
    "Shining Bright: The Unstoppable Beauty of American Women ✨🔥",
    "Iconic & Stunning: American Women Redefining Beauty 🇺🇸💃",
    "Unforgettable Charm: The Beauty of American Women ✨💖",
    "Golden Glow: The Captivating Beauty of American Women 🇺🇸🔥",
    "Confident & Classy: The Irresistible Allure of American Women ✨💃",
    "Dreamy & Delightful: The Mesmerizing Beauty of American Women 🇺🇸😍",
    "Ethereal Beauty: The Magic of American Women ✨🔥",
    "Forever Gorgeous: The Timeless Elegance of American Women 🇺🇸💖",
    "Queen Vibes Only 👑✨ | The Beauty of American Women",
    "Pure Elegance: The Classy Beauty of American Women 🇺🇸💃",
    "Chic & Confident: The Stunning Presence of American Women ✨💖",
    "Radiance Unleashed: The Gorgeous Beauty of American Women 🇺🇸🔥",
    "Glamour Defined: The Iconic Beauty of American Women ✨💃",
    "Stunning & Serene: The Mesmerizing Beauty of American Women 🇺🇸✨",
    "Power & Grace: The Flawless Beauty of American Women 💃🔥",
    "Bold & Beautiful: The American Women Who Own Their Charm 🇺🇸💖",
    "Fierce & Fabulous: The Confidence of American Women ✨💃",
    "Golden Hour Glow: The Breathtaking Beauty of American Women 🇺🇸🔥",
    "Alluring & Elegant: The Spellbinding Beauty of American Women ✨💖",
    "Queen Energy 👑🔥 | The Ultimate Beauty of American Women",
    "Diva Mode On 💃✨ | The Unmatched Elegance of American Women",
    "Mesmerizing Magic: The Stunning Beauty of American Women 🇺🇸💖",
    "Chasing Dreams & Looking Stunning ✨🔥 | American Women Beauty",
    "From Coast to Coast: The Breathtaking Beauty of American Women 🇺🇸💃",
    "Unstoppable Charm: The Gorgeous Beauty of American Women ✨💖",
    "Flawless Feminine Energy ✨🔥 | The Beauty of American Women",
    "Effortlessly Beautiful: The Natural Charm of American Women 🇺🇸💃",
    "The Ultimate Glow Up ✨🔥 | American Women Beauty at Its Best",
    "Shining Bright Like a Diamond 💎✨ | American Women’s Beauty",
    "Simply Stunning: The Irresistible Charm of American Women 🇺🇸💖",
    "Beyond Beautiful: The Radiant Beauty of American Women ✨🔥",
    "The True Definition of Beauty 💃✨ | American Women Edition",
    "Captivating Confidence: The Elegance of American Women 🇺🇸💖",
    "Unparalleled Beauty: The Allure of American Women ✨🔥",
    "Forever Iconic: The Mesmerizing Beauty of American Women 🇺🇸💃",
    "Glowing & Gorgeous: The Beauty of American Women ✨💖",
    "The Magic of Femininity ✨🔥 | The Stunning Beauty of American Women",
    "Incredible & Irresistible: The Beauty of American Women 🇺🇸💃",
    "Dazzling Dreams: The Beauty of American Women ✨💖",
    "Glam Up & Shine ✨🔥 | The Stunning Beauty of American Women",
    "Breathtaking & Beautiful: The Mesmerizing Charm of American Women 🇺🇸💃",
    "The Queen's Glow 👑✨ | The Unstoppable Beauty of American Women",
    "Confidently Chic: The Power of American Women’s Beauty ✨💖",
    "Magnetic Beauty: The Enchanting Presence of American Women 🇺🇸🔥",
    "Naturally Stunning: The Effortless Beauty of American Women ✨💃",
    "Beyond Glamorous: The Timeless Beauty of American Women 🇺🇸💖",
    "Golden Beauty: The Everlasting Glow of American Women ✨🔥",
    "Glowing from Within: The Inner & Outer Beauty of American Women 🇺🇸💃",
    "Endless Elegance: The Captivating Beauty of American Women ✨💖",
    "Effortlessly Enchanting: The Stunning Beauty of American Women 🇺🇸🔥",
    "The Ultimate Feminine Glow ✨💖 | American Women’s Beauty",
    "Diva Mode Activated 💃🔥 | The Beauty of American Women",
    "Dream Big, Shine Bright ✨💖 | The Elegance of American Women",
    "Unmatched Charm: The Beauty of American Women 🇺🇸🔥",
    "Forever Radiant: The Timeless Beauty of American Women ✨💃",
    "Golden Hour Perfection ✨💖 | The Stunning Beauty of American Women",
    "Irresistible Glow ✨🔥 | The True Beauty of American Women",
    "Flawless & Fearless: The Beauty of American Women 🇺🇸💃",
    "Eternal Elegance: The Graceful Beauty of American Women ✨💖",
    "She’s a Queen 👑✨ | The Stunning Charm of American Women",
    "Beauty & Confidence: The Ultimate American Women Glow Up 🇺🇸🔥",
    "Naturally Breathtaking: The Beauty of American Women ✨💃",
    "The Power of Elegance ✨💖 | American Women Shine Bright",
    "Undeniable Beauty: The Charm of American Women 🇺🇸🔥",
    "Forever Stunning: The Flawless Beauty of American Women ✨💃",
    "She’s Got the Glow ✨💖 | American Women’s Beauty on Fire",
    "Effortless Elegance: The Stunning Beauty of American Women 🇺🇸🔥",
    "Unstoppable Shine ✨💖 | The Radiant Beauty of American Women",
    "The Glow Up is Real 💃✨ | American Women Slaying in Style",
    "True Goddess Energy 👑🔥 | The Beauty of American Women",
    "Captivating & Chic: The Alluring Beauty of American Women 🇺🇸💃",
    "Bold & Radiant: The Irresistible Charm of American Women ✨💖",
    "She’s a Stunner 💃✨ | The Iconic Beauty of American Women",
    "Unforgettable Elegance: The Timeless Beauty of American Women 🇺🇸🔥",
    "Shimmer & Shine ✨💖 | The Glamorous Beauty of American Women",
    "Golden Glow Goals ✨🔥 | The Stunning Beauty of American Women",
    "Simply Radiant: The Undeniable Beauty of American Women 🇺🇸💃",
  ];


  try {
    const {
      text,
      name,
      userMongoId,
      username,
      profileImg,
      uploadedUrl,
      resource_type,
      width,
      height,
    } = await processFileUpload(req);

    await connect();

    if (!user || user.publicMetadata.userMongoId !== userMongoId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const filterTitle = text
      ? text
      : videoTitles[Math.floor(Math.random() * videoTitles.length)];

    const newPost = await Post.create({
      user: userMongoId,
      name: name,
      username: username,
      text: filterTitle,
      profileImg: profileImg,
      uploadedUrl: uploadedUrl,
      resourceType: resource_type,
      height,
      width,
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
