import Ad from "@/lib/models/ads.model.js";
import { connect } from "@/lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    // MongoDB এর সাথে সংযোগ স্থাপন
    await connect();

    // req.body থেকে ad_script এবং category নেওয়া
    const { ad_script, category } = await req.json();

    // নতুন বিজ্ঞাপন তৈরি
    const ad = new Ad({
      category,
      ad_script,
    });

    // বিজ্ঞাপনটি ডাটাবেজে সংরক্ষণ
    await ad.save();

    // সফল হলে নতুন বিজ্ঞাপন ফেরত
    console.log({ad})
    return new Response(JSON.stringify(ad), {
      status: 201, // Created
    });
  } catch (error) {
    console.log("Error creating ads:", error);
    return new Response("Error creating ads", {
      status: 500,
    });
  }
};
