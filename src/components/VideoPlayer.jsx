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

export default function TestVideoPlayer({ data, isActive }) {
  const { uploadedUrl, name, text, profileImg, height } = data;

  const videoRef = useRef(null);;
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
      const screenCenter = window.innerHeight / 2;
      const upperBound = screenCenter - 20;
      const lowerBound = screenCenter + 20;

      let bestVideo = null;
      let maxVisibleHeight = 0;

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const videoTop = rect.top;
        const videoBottom = rect.bottom;

        // ভিডিওর কতটুকু অংশ ২০০px রেঞ্জের মধ্যে আছে তা বের করছি
        const visiblePart =
          Math.min(videoBottom, lowerBound) - Math.max(videoTop, upperBound);

        if (visiblePart > maxVisibleHeight) {
          maxVisibleHeight = visiblePart;
          bestVideo = video;
        }
      });

      // যদি কোনো ভিডিও ২০০px রেঞ্জের মধ্যে না থাকে, সব ভিডিও বন্ধ করবো
      if (!bestVideo) {
        videos.forEach((video) => {
          video.pause();
          video.muted = true;
        });
        return;
      }

      // বাকি সব ভিডিও বন্ধ করে শুধু bestVideo চালু করবো
      videos.forEach((video) => {
        if (video === bestVideo) {
          if (video.paused) {
            video.play();
            video.muted = false;
          }
        } else {
          video.pause();
          video.muted = true;
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

  const updateProgress = (e) => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
   
  };

  const handleSeek = (e) => {
    const div = e.currentTarget; // Progress bar div
    const totalWidth = div.offsetWidth; // div-এর মোট প্রস্থ
    const clickX = e.clientX - div.getBoundingClientRect().left; // ক্লিকের X পজিশন

    const progress = (clickX / totalWidth) * 100; // পার্সেন্ট ক্যালকুলেশন
    const seekTime = (progress / 100) * duration; // ভিডিওর সময় হিসাব

    videoRef.current.currentTime = seekTime; // ভিডিওর সময় আপডেট করুন
    setProgress(progress); // State আপডেট করুন
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

  const videoHeight = (value) => {
    const num = Number(value); // Ensure the value is a number
    if (num < 300) return 300;
    if (num > 650) return 650;
    return num;
  };

  return (
    <div
      onClick={resetControlsTimer}
      className={`relative w-full h-[${videoHeight(
        height
      )}px] mt-2 flex justify-center items-center bg-black`}
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
        preload="auto"
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

        <div className="absolute px-5 pt-3 left-0 bottom-0 w-full flex flex-col gap-0.5 bg-gradient-to-b from-[#00000002] to-[#000000ca]">
          <div className="flex items-end justify-between mb-2 ">
            {/* left side */}
            <div className="flex flex-col gap-1.5">
              <div className="text-white font-semibold flex items-center gap-1.5">
                <Image
                  className="rounded-full border"
                  src={profileImg}
                  alt="logo"
                  width={24}
                  height={24}
                />
                <p className="text-sm font-normal text-shadow-lg">{name}</p>
                <p>
                  <MdPublic className={`text-xs animate-spin ${ isActive && "duration-1000"} `} />
                </p>
              </div>
              <p className="text-white text-sm overflow-hidden line-clamp-2 text-ellipsis mr-10 text-shadow-lg font-extralight">
                {text || "Default video description"}
              </p>
              <p className="text-white text-xs font-extralight text-shadow-lg">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
            {/* right side */}
            <div className="flex flex-col gap-4">
              <FaRegThumbsUp className="text-white text-lg" />
              <div onClick={toggleMute}>
                {isMuted ? (
                  <FaVolumeMute className="text-white text-lg" />
                ) : (
                  <FaVolumeUp className="text-white text-lg" />
                )}
              </div>
              <button
                onClick={toggleFullscreen}
                className="text-white text-shadow-lg text-lg"
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>

          <div className=" w-full text-sm relative mb-2.5">
            <div onClick={handleSeek} onTouchStart={handleSeek} >
              <div className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer"></div>
              <div
                className="absolute text-shadow-lg top-1/2 left-0 -translate-y-1/2 h-1 bg-blue-500 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
