import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
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
          <div className="relative aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-elegant bg-muted">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              poster="/images/construction-aerial.jpg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/skyline.mp4" type="video/mp4" />
              <div className="flex items-center justify-center h-full bg-muted">
                <p className="text-muted-foreground">Video not available</p>
              </div>
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center group">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                  variant="outline"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                
                <Button
                  onClick={toggleMute}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                  variant="outline"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                
                <Button
                  onClick={toggleFullscreen}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                  variant="outline"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Fallback for no video */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm" 
                 style={{ display: videoRef.current?.error ? 'flex' : 'none' }}>
              <div className="text-center text-white p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
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