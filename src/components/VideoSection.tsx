import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, PictureInPicture2, SkipBack, SkipForward } from "lucide-react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume * 100);
      setIsMuted(video.muted);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // Auto-hide controls
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'ArrowLeft':
          skipTime(-10);
          break;
        case 'ArrowRight':
          skipTime(10);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      showControlsTemporarily();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      showControlsTemporarily();
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      showControlsTemporarily();
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume / 100;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
        videoRef.current.controls = true;
      }
    }
  };

  const togglePictureInPicture = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.log('Picture-in-Picture not supported');
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (videoRef.current) {
        videoRef.current.controls = !!document.fullscreenElement;
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            See Our Work in Action
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Watch how we transform visions into reality with our professional construction services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className="relative aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-elegant bg-muted group cursor-pointer"
            onMouseEnter={showControlsTemporarily}
            onMouseMove={showControlsTemporarily}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              muted={isMuted}
              loop
              playsInline
              poster="/images/construction-aerial.jpg"
              controlsList="nodownload"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/skyline.mp4" type="video/mp4" />
              <div className="flex items-center justify-center h-full bg-muted">
                <p className="text-muted-foreground">Video not available</p>
              </div>
            </video>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white"></div>
              </div>
            )}

            {/* Center Play Button (when paused) */}
            {!isPlaying && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl"
                  variant="outline"
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </div>
            )}

            {/* Top Center Maximize Button (always visible on mobile) */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 sm:hidden">
              <Button
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                size="icon"
                className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
                variant="outline"
                aria-label="Maximize"
              >
                <Maximize className="h-6 w-6" />
              </Button>
            </div>

            {/* Modern Video Controls */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-500 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}>
              
              {/* Top Controls (hidden on mobile, use new button above) */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 hidden sm:flex">
                <Button
                  onClick={togglePictureInPicture}
                  size="sm"
                  className="bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md transition-all duration-300"
                  variant="outline"
                >
                  <PictureInPicture2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={toggleFullscreen}
                  size="sm"
                  className="bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md transition-all duration-300"
                  variant="outline"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 space-y-2 sm:space-y-3">
                {/* Progress Bar */}
                <div className="w-full">
                  <Slider
                    value={[duration ? (currentTime / duration) * 100 : 0]}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={0.1}
                    className="w-full [&_[role=slider]]:w-3 sm:[&_[role=slider]]:w-4 [&_[role=slider]]:h-3 sm:[&_[role=slider]]:h-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-lg [&_[role=slider]]:transition-all [&_[role=slider]]:duration-200 [&_[role=slider]]:hover:scale-110"
                  />
                </div>

                {/* Control Bar */}
                <div className="flex items-center justify-between">
                  {/* Left Controls */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Button
                      onClick={(e) => { e.stopPropagation(); skipTime(-10); }}
                      size="icon"
                      className="bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 p-1 sm:p-2"
                      variant="outline"
                    >
                      <SkipBack className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                      size="icon"
                      className="bg-white/90 hover:bg-white text-black border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 p-1 sm:p-2"
                      variant="outline"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
                      )}
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); skipTime(10); }}
                      size="icon"
                      className="bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 p-1 sm:p-2"
                      variant="outline"
                    >
                      <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Button
                        onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                        size="icon"
                        className="bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md transition-all duration-300 p-1 sm:p-2"
                        variant="outline"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </Button>
                      <div className="w-12 sm:w-20 hidden sm:block">
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          onValueChange={handleVolumeChange}
                          max={100}
                          step={1}
                          className="[&_[role=slider]]:w-2 sm:[&_[role=slider]]:w-3 [&_[role=slider]]:h-2 sm:[&_[role=slider]]:h-3 [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Controls - Time Display */}
                  <div className="text-white text-xs sm:text-sm font-mono bg-black/40 px-2 sm:px-3 py-1 rounded-full backdrop-blur-md">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts Hint */}
            {showControls && (
              <div className="absolute top-4 left-4 text-white/80 text-xs bg-black/40 px-3 py-2 rounded-lg backdrop-blur-md animate-fade-in">
                <div className="space-y-1">
                  <div>Space: Play/Pause</div>
                  <div>M: Mute • F: Fullscreen</div>
                  <div>← →: Skip 10s</div>
                </div>
              </div>
            )}

            {/* Fallback for no video */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm" 
                 style={{ display: videoRef.current?.error ? 'flex' : 'none' }}>
              <div className="text-center text-white p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <p className="text-lg sm:text-xl font-semibold mb-2">Video Coming Soon</p>
                <p className="text-sm sm:text-base text-white/80">
                  Add your showcase video as "showcase-video.mp4" in the public/videos folder
                </p>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              From foundation to finishing touches, witness our commitment to excellence in every project we undertake.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;