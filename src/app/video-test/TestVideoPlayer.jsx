"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Image from "next/image";
import {
  FaBackward,
  FaCompress,
  FaExpand,
  FaForward,
  FaPause,
  FaPlay,
  FaRegThumbsUp,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { MdPublic } from "react-icons/md";

let activeVideo = null;

export default function TestVideoPlayer({ data }) {
  const { uploadedUrl, name, text, profileImg } = data;

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const hideControlsTimeout = useRef(null);

  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(uploadedUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setLoading(false));
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = uploadedUrl;
      videoElement.addEventListener("loadedmetadata", () => setLoading(false));
    }

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
            video
              .play()
              .catch((error) => console.error("Error playing:", error));
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
  }, [uploadedUrl]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current
        .requestFullscreen()
        .catch((err) => console.error("Fullscreen error:", err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const updateProgress = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  };

  const handleSeek = (e) => {
    console.log(e)
    const div = e.currentTarget; // Progress bar div
    const totalWidth = div.offsetWidth; // div-এর মোট প্রস্থ
    const clickX = e.clientX - div.getBoundingClientRect().left; // ক্লিকের X পজিশন
    
    const progress = (clickX / totalWidth) * 100; // পার্সেন্ট ক্যালকুলেশন
    const seekTime = (progress / 100) * duration; // ভিডিওর সময় হিসাব
  
    videoRef.current.currentTime = seekTime; // ভিডিওর সময় আপডেট করুন
    setProgress(progress); // State আপডেট করুন
  
    console.log(`Seek to: ${progress.toFixed(2)}% - Time: ${seekTime.toFixed(2)}s`);
  };

  useEffect(() => {
    setShowControls(true);
    const timeout = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const resetControlsTimer = () => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    setShowControls(true);
    hideControlsTimeout.current = setTimeout(
      () => setShowControls(false),
      2000
    );
  };

  return (
    <div
      onClick={resetControlsTimer}
      className="relative w-full h-[300px] mt-2 flex justify-center items-center bg-black"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading...
        </div>
      )}
      <video
        ref={videoRef}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={updateProgress}
        className="w-full h-full object-cover"
        muted
        loop
      />
      <div className="absolute top-0 left-0 w-full h-full">
        {showControls && (
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex gap-3">
            <button
              className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] text-gray-300 text-xl"
              onClick={() => (videoRef.current.currentTime -= 5)}
            >
              <FaBackward />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] text-gray-300 text-xl"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] text-gray-300 text-xl"
              onClick={() => (videoRef.current.currentTime += 5)}
            >
              <FaForward />
            </button>
          </div>
        )}

        <div className="absolute px-5 left-0 bottom-[10px] w-full flex flex-col gap-0.5">
          <div className="w-full text-sm flex justify-between items-center">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <Image
                className="rounded-full border"
                src={profileImg}
                alt="logo"
                width={24}
                height={24}
              />
              <span className="text-sm font-normal text-shadow-lg">{name}</span>
              <span>
                <MdPublic />
              </span>
            </div>
            <FaRegThumbsUp className="text-white text-lg" />
          </div>
          <div className="w-full text-sm flex justify-between items-center">
            <span className="text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[80%] text-shadow-lg font-extralight">
              {text || "Default video description"}
            </span>
            <div onClick={toggleMute}>
              {isMuted ? (
                <FaVolumeMute className="text-white text-lg" />
              ) : (
                <FaVolumeUp className="text-white text-lg" />
              )}
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <span className="text-white text-xs font-extralight text-shadow-lg">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button
              onClick={toggleFullscreen}
              className="text-white text-shadow-lg text-lg"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>

          <div className=" w-full text-sm relative">
            <div  onChange={handleSeek} className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer" ></div>
            <div
              className="absolute text-shadow-lg top-1/2 left-0 -translate-y-1/2 h-1 bg-blue-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
