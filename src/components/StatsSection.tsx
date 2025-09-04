import { useEffect, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { number: 150, label: "Projects Completed", suffix: "+" },
    { number: 15, label: "Years Experience", suffix: "+" },
    { number: 98, label: "Client Satisfaction", suffix: "%" },
    { number: 25, label: "Expert Engineers", suffix: "+" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section id="stats-section" className="py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Proven <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Numbers that speak to our commitment to quality and client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-xl bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 hover:border-primary/30 transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-lg font-medium text-secondary-foreground/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;