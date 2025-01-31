"use client"
import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

const DemoVideo = () => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Play/Pause Video
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mute/Unmute Video
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Update Progress Bar
  const updateProgress = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  };

  // Seek Video
  const seekVideo = (e) => {
    const width = progressRef.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newTime = (offsetX / width) * duration;
    videoRef.current.currentTime = newTime;
  };

  // Format Time (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="relative w-full max-w-2xl bg-black rounded-lg overflow-hidden shadow-xl">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          onTimeUpdate={updateProgress}
          onLoadedMetadata={updateProgress}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
          {/* Custom Progress Bar */}
          <div
            ref={progressRef}
            className="relative h-2 bg-gray-600 rounded cursor-pointer"
            onClick={seekVideo}
          >
            <div
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-2">
            <button onClick={togglePlay} className="text-white text-2xl p-2">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {/* Time Display */}
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button onClick={toggleMute} className="text-white text-2xl p-2">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            <button onClick={toggleFullscreen} className="text-white text-2xl p-2">
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoVideo;
