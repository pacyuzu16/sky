"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true); // autoplay starts playing
  const [isMuted, setIsMuted] = useState(true); // autoplay starts muted
  const [volume, setVolume] = useState(1);

  // Pause when out of view, resume when in view
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;

          if (entry.isIntersecting) {
            // If video should play
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          } else {
            // Pause when not visible
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // 50% visible = considered in view
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Mute/Unmute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] overflow-hidden"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/images/construction-aerial.jpg"
      >
        <source src="/videos/showcase-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
        <div className="flex items-center space-x-4 bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="text-white hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="text-white hover:scale-110 transition-transform"
          >
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>

          {/* Volume Slider (only visible when not muted) */}
          {!isMuted && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-primary"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
