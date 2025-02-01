"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

let activeVideo = null;

export default function TestVideoPlayer({ videoUrl }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true); // লোডিং স্টেট

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // HLS স্ট্রিমিং সেটআপ
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setLoading(false)); // ম্যানিফেস্ট লোড হলে লোডিং বন্ধ
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = videoUrl;
      videoElement.addEventListener("loadedmetadata", () => setLoading(false));
    }

    // স্ক্রলে সেন্টার ভিডিও চেক
    const checkVisibleVideo = () => {
      const videos = document.querySelectorAll("video");
      let mostCenteredVideo = null;
      let minDistanceFromCenter = Infinity;

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const videoCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const distanceFromCenter = Math.abs(videoCenter - screenCenter);

        if (distanceFromCenter < minDistanceFromCenter) {
          minDistanceFromCenter = distanceFromCenter;
          mostCenteredVideo = video;
        }
      });

      videos.forEach((video) => {
        if (video === mostCenteredVideo) {
          if (video.paused) {
            video.play().catch((error) => {
              console.error("Error playing video:", error);
            });
            video.muted = false;
          }
        } else {
          if (!video.paused) {
            video.pause();
            video.muted = true;
          }
        }
      });
    };

    // ম্যানুয়ালি অন্য ভিডিও প্লে করলে আগেরটি বন্ধ হবে
    const handleManualPlay = () => {
      if (activeVideo && activeVideo !== videoElement) {
        activeVideo.pause();
        activeVideo.muted = true;
      }
      activeVideo = videoElement;
      activeVideo.muted = false;
    };

    window.addEventListener("scroll", checkVisibleVideo);
    window.addEventListener("resize", checkVisibleVideo);
    videoElement.addEventListener("play", handleManualPlay);

    checkVisibleVideo();

    return () => {
      window.removeEventListener("scroll", checkVisibleVideo);
      window.removeEventListener("resize", checkVisibleVideo);
      videoElement.removeEventListener("play", handleManualPlay);
    };
  }, [videoUrl]);

  return (
    <div className="relative w-full h-[300px] flex justify-center items-center bg-black">
      {loading && <div className="absolute inset-0 flex items-center justify-center text-white">Loading...</div>}
      <video ref={videoRef} className="w-full h-full object-cover rounded-lg" controls muted />
    </div>
  );
}
