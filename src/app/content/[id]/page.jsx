import NewsFeed from "@/components/NewsFeed";
import Share from "@/components/Share";
import VideoAndImage from "@/components/VideoAndImage";
import MobileNavbar from "@/components/MobileNavbar";
import Head from "next/head";
import ContentError from "@/components/error/ContentError";

export default async function SingleContent({ params }) {
  const resolvedParams = await params;

  if (!resolvedParams?.id) {
    return <h1>Error: Video ID not found!</h1>;
  }

  try {
    const res = await fetch(
      `${process.env.URL}/api/post/${resolvedParams.id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log("error");
      throw new Error("Failed to fetch video");
    }

    const videoData = await res.json();

    // ✅ Ensure Thumbnail uses HTTPS
    const secureThumbnail = videoData.tumb.startsWith("http:")
      ? videoData.tumb.replace("http:", "https:")
      : videoData.tumb;

    const metadata = {
      _id: videoData._id,
      title: videoData.text,
      uploadedUrl: videoData.uploadedUrl,
      tumb: secureThumbnail, // ✅ Correct thumbnail URL
      width: videoData.width,
      height: videoData.height,
      resourceType: videoData.resourceType,
      user: {
        name: videoData.name,
        username: videoData.username,
        profileImg: videoData.profileImg,
      },
      engagement: {
        likes: videoData.likes.length,
        comments: videoData.comments.length,
      },
      timestamps: {
        createdAt: new Date(videoData.createdAt).toLocaleString(),
        updatedAt: new Date(videoData.updatedAt).toLocaleString(),
      },
      description:
        "Watch this amazing content showcasing the power of confidence and beauty in American women.",
      keywords: "American women, beauty, confidence, chic, empowerment",
      author: "Dark Face Team",
    };

    // ✅ Set correct Open Graph type
    const ogType = metadata.resourceType === "video" ? "video.other" : "image";

    // ✅ Open Graph & Twitter Meta Tags
    const socialMediaMetaTags = (
      <Head>
        <title>{metadata.title} | Dark Face</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />

        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.tumb} />
        <meta property="og:image:secure_url" content={metadata.tumb} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="1280" />

        {ogType === "video.other" && (
          <>
            <meta property="og:video" content={metadata.uploadedUrl} />
            <meta property="og:video:type" content="video/mp4" />
            <meta property="og:video:width" content={metadata.width} />
            <meta property="og:video:height" content={metadata.height} />
          </>
        )}

        <meta
          property="og:url"
          content={`${process.env.URL}/content/${metadata._id}`}
        />
        <meta
          name="twitter:card"
          content={ogType === "video.other" ? "player" : "summary_large_image"}
        />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.tumb} />

        {ogType === "video.other" && (
          <>
            <meta name="twitter:player" content={metadata.uploadedUrl} />
            <meta name="twitter:player:width" content={metadata.width} />
            <meta name="twitter:player:height" content={metadata.height} />
          </>
        )}

        <link
          rel="canonical"
          href={`${process.env.URL}/content/${metadata._id}`}
        />
      </Head>
    );

    return (
      <>
        {socialMediaMetaTags}{" "}
        {/* Include the meta tags here for SEO/Social Preview */}
        <div>
          <MobileNavbar />
          <Share />
          <VideoAndImage post={videoData} />
          <NewsFeed adFalse={true} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching video:", error);
    return (
      <div className="w-full min-h-screen ">
        <MobileNavbar />
        <Share />
        <ContentError />
        <NewsFeed />
      </div>
    );
  }
}
