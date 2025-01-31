"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
  FaCommentAlt,
  FaRegThumbsUp,
} from "react-icons/fa";

const VideoPlayer = (data) => {
  const videoUrl = data.data.uploadedUrl || "";
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // 🔇 Default: Muted (AutoPlay Works)
      videoRef.current
        .play()
        .catch((err) => console.error("AutoPlay Blocked:", err));
    }
  }, []);

  const enableSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // 🔊 Unmute when user clicks
      setIsMuted(false);
    }
  };

  const seekVideo = (e) => {
    const width = progressRef.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    videoRef.current.currentTime = (offsetX / width) * duration;
  };

  const updateProgress = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
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
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const seekForward = () => (videoRef.current.currentTime += 5);
  const seekBackward = () => (videoRef.current.currentTime -= 5);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="flex items-center justify-center h-full mt-2 overflow-hidden"
      onClick={enableSound}
    >
      <div className="h-full w-full relative flex justify-center items-center">
        <video
          ref={videoRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={updateProgress}
          className="w-full h-auto border-2 rounded-lg dark:border-gray-600"
          autoPlay
          loop
          controls={false} // Prevent default controls from showing
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex gap-3">
            <button
              className="w-10 h-10 flex justify-center items-center rounded-full bg-[#0000005a] dark:bg-[#00000080] text-gray-300 text-xl"
              onClick={seekBackward}
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
              onClick={seekForward}
            >
              <FaForward />
            </button>
          </div>

          <div className="absolute left-0 bottom-[10px] w-full px-5 text-sm">
            <div className="w-full flex justify-between items-center mb-2">
              <div className="text-white font-semibold flex items-center gap-1.5">
                <Image
                  className="rounded-full border"
                  src="/general/avatar.png"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <span>Tanvir Ahmed</span>
              </div>
              <FaRegThumbsUp className="text-white text-lg" />
            </div>

            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-white whitespace-nowrap overflow-hidden text-ellipsis mr-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
              <FaCommentAlt className="text-white text-2xl" />
            </div>

            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-white font-semibold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div onClick={toggleMute}>
                {isMuted ? (
                  <FaVolumeMute className="text-white text-lg" />
                ) : (
                  <FaVolumeUp className="text-white text-lg" />
                )}
              </div>
            </div>

            <div className="w-full h-1">
              <div
                ref={progressRef}
                className="h-1 bg-gray-600 rounded cursor-pointer w-full relative dark:bg-gray-500"
                onClick={seekVideo}
              >
                <div
                  className="absolute top-0 left-0 h-1 bg-blue-500 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
