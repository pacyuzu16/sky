import { useEffect, useState } from "react";
import { Award, Clock, Star, Users } from "lucide-react";
const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const achievements = [{
    number: 15,
    label: "Projects Completed",
    icon: Award,
    suffix: "+"
  }, {
    number: 4,
    label: "Years of Experience",
    icon: Clock,
    suffix: "+"
  }, {
    number: 80,
    label: "Client Satisfaction",
    icon: Star,
    suffix: "%"
  }, {
    number: 20,
    label: "Expert Team Members",
    icon: Users,
    suffix: "+"
  }];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    const section = document.getElementById('achievements-section');
    if (section) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  const CountUp = ({
    end,
    duration = 2000,
    suffix = ""
  }: {
    end: number;
    duration?: number;
    suffix?: string;
  }) => {
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
    return <span className="text-3xl lg:text-4xl font-bold text-foreground">
        {count}{suffix}
      </span>;
  };
  return <section id="achievements-section" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      
    </section>;
};
export default AchievementsSection;