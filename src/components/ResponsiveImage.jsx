import { useState } from "react";

const ResponsiveImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullscreenCount, setFullscreenCount] = useState(0); // Track fullscreen count
  const [isFullScreenState, setIsFullScreenState] = useState(false); // State after 2 times fullscreen


  // Open Fullscreen and track how many times fullscreen is triggered
  const openFullscreen = () => {
    setFullscreenCount((prevCount) => prevCount + 1); // Increment fullscreen count
    if (fullscreenCount + 1 === 2) {
      setIsFullScreenState(true); // Set state to true after 2nd fullscreen
    }
    setIsOpen(true); // Open fullscreen
  };

  const adOpenHandle = () => {
    setFullscreenCount(0);
    setIsFullScreenState(false);
  };

  return (
    <>
      {/* Thumbnail Image */}
      <img
        src={src}
        alt={alt}
        className="w-full max-w-full h-auto max-h-[500px] mt-3 object-cover cursor-pointer"
        onClick={openFullscreen}
      />

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="">
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)} // Close fullscreen when clicked outside
          >
            <img
              src={src}
              alt={alt}
              className="transition-transform duration-300 object-contain"
            />
          </div>
        </div>
      )}

      {/* Display the state message after second fullscreen */}
      {isFullScreenState && (
        <a
          onClick={adOpenHandle}
          href="https://www.profitablecpmrate.com/yj2qyqi6m?key=858396bb68661d53d616ef34fd3ff6ce"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="fixed top-0 left-0 w-screen h-screen text-white z-50 bg-[#1635ff02]"></div>
        </a>
      )}
    </>
  );
};

export default ResponsiveImage;
