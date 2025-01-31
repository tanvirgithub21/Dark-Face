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
  const { uploadedUrl } = data || {};
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
      className="flex items-center justify-center min-h-full max-h-[80vh]"
      onClick={enableSound}
    >
      <div className="h-full max-h-full relative">
        <video
          ref={videoRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={updateProgress}
          className="w-full h-full border-2 rounded-lg"
          autoPlay
          loop
        >
          <source src={uploadedUrl} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex gap-3">
            <button
              className="w-8 h-8 flex justify-center items-center rounded-full bg-[#0000005a]"
              onClick={seekBackward}
            >
              <FaBackward />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex justify-center items-center rounded-full bg-[#0000005a]"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="pl-[2px]" />}
            </button>
            <button
              className="w-8 h-8 flex justify-center items-center rounded-full bg-[#0000005a]"
              onClick={seekForward}
            >
              <FaForward />
            </button>
          </div>

          <div className="absolute bottom-[70px] w-full flex justify-between items-center px-5">
            <div className="text-white text-xs font-semibold flex items-center gap-2">
              <Image
                className="rounded-full border"
                src="/general/avatar.png"
                alt="logo"
                width={24}
                height={24}
              />
              <span>Tanvir Ahmed</span>
            </div>
            <FaRegThumbsUp />
          </div>

          <div className="absolute bottom-[45px] w-full flex justify-between items-center px-5">
            <span className="text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis mr-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
            <FaCommentAlt />
          </div>

          <div className="absolute bottom-[20px] w-full flex justify-between items-center px-5">
            <span className="text-white text-xs font-semibold">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <div onClick={toggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
          </div>

          <div className="absolute bottom-[10px] left-0 w-full h-1">
            <div
              ref={progressRef}
              className="h-1 bg-gray-600 rounded cursor-pointer w-[90%] absolute left-1/2 -translate-x-1/2"
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
  );
};

export default VideoPlayer;
