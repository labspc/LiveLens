import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface LivePhotoProps {
  imageUrl: string;
  videoUrl: string;
}

const LivePhoto: React.FC<LivePhotoProps> = ({ imageUrl, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && videoRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      videoRef.current.currentTime = videoRef.current.duration * percentage;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={imageUrl}
        alt="Live Photo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoRef}
        src={videoUrl}
        className={`absolute inset-0 w-full h-full object-cover ${
          isHovering ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        loop
        muted={!isPlaying}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className={`p-2 rounded-full bg-black bg-opacity-50 text-white ${
            isHovering ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
    </div>
  );
};

export default LivePhoto;