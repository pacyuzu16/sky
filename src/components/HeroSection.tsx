import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const HeroSection = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<any>();
  const [useVideo, setUseVideo] = useState(false);

  const heroImages = [
    { src: "/images/new-1.jpg", alt: "Construction site aerial view" },
    { src: "/images/new-2.jpg", alt: "Construction site aerial view" },
    { src: "/images/new-3.jpg", alt: "Construction site aerial view" },
  ];

  // Check if video exists
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/hero-video.mp4';
    video.onloadeddata = () => setUseVideo(true);
    video.onerror = () => setUseVideo(false);
  }, []);

  // Auto-play carousel (only if not using video)
  useEffect(() => {
    if (!api || useVideo) return;

    const autoPlay = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(autoPlay);
  }, [api, useVideo]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Image Carousel */}
      <div className="absolute inset-0">
        {useVideo ? (
          // Video Background
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="/images/construction-aerial.jpg"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            {/* Fallback to first image if video fails */}
            <img 
              src="/images/construction-aerial.jpg" 
              alt="Construction site aerial view" 
              className="w-full h-full object-cover" 
            />
          </video>
        ) : (
          // Image Carousel Fallback
          <Carousel 
            setApi={setApi} 
            className="w-full h-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="h-screen">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover" 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Building Your 
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Dreams</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
          Professional construction services with unmatched quality and reliability
        </p>
        
        {/* Modern CTA Button */}
        <Button 
          onClick={() => navigate("/contact")}
          className="bg-gradient-primary text-white border-0 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-elegant hover:shadow-glow"
          size="lg"
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
};
export default HeroSection;