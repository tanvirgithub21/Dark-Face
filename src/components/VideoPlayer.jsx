"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js"; // HLS লাইব্রেরি ইমপোর্ট
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
  FaCommentAlt,
  FaRegThumbsUp,
  FaExpand,
  FaCompress,
  FaSpinner,
} from "react-icons/fa";

const VideoPlayer = ({ data }) => {
  const { uploadedUrl, name, text, profileImg } = data;
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideControlsTimeout = useRef(null);


  console.log({isFullscreen})

  // HLS ভিডিও লোড করা হচ্ছে
  useEffect(() => {
    if (!uploadedUrl) return;

    const video = videoRef.current;
    setIsLoading(true);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(uploadedUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = uploadedUrl;
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        video.play().catch(() => setIsPlaying(false));
      });
    }
  }, [uploadedUrl]);

  useEffect(() => {
    setShowControls(true);
    const timeout = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => setIsPlaying(false));
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
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

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    resetControlsTimer();
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    resetControlsTimer();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetControlsTimer();
  };

  const updateProgress = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-full mt-2 overflow-hidden"
      onClick={resetControlsTimer}
    >
      <div className="h-full w-full relative flex justify-center items-center">
        {isLoading && (
          <div className="absolute flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <FaSpinner className="text-white text-4xl animate-spin" />
          </div>
        )}

        <video
          ref={videoRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={updateProgress}
          className="w-full h-auto border-2 rounded-lg dark:border-gray-600"
          autoPlay
          loop
          controls={false}
        />

        {showControls  && (
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex gap-3">
              <button
                className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] dark:bg-[#00000080] text-gray-300 text-xl"
                onClick={() => (videoRef.current.currentTime -= 5)}
              >
                <FaBackward />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] dark:bg-[#00000080] text-gray-300 text-xl"
              >
                {isPlaying ? <FaPause /> : <FaPlay className="pl-[2px]" />}
              </button>
              <button
                className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] dark:bg-[#00000080] text-gray-300 text-xl"
                onClick={() => (videoRef.current.currentTime += 5)}
              >
                <FaForward />
              </button>
            </div>

            <div className="absolute left-0 bottom-[10px] w-full px-5 text-sm">
              <div className="w-full flex justify-between items-center mb-2">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <Image
                    className="rounded-full border"
                    src={profileImg}
                    alt="logo"
                    width={24}
                    height={24}
                  />
                  <span>{name}</span>
                </div>
                <FaRegThumbsUp className="text-white text-lg" />
              </div>

              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
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

              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-white font-semibold">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  onClick={toggleFullscreen}
                  className="text-white text-lg"
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>

              <div
                className="w-full h-1 bg-gray-600 rounded cursor-pointer relative dark:bg-gray-500"
                onClick={(e) => {
                  const width = progressRef.current.clientWidth;
                  videoRef.current.currentTime =
                    (e.nativeEvent.offsetX / width) * duration;
                }}
              >
                <div
                  className="absolute top-0 left-0 h-1 bg-blue-500 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
