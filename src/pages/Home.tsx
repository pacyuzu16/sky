import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AchievementsSection from "@/components/AchievementsSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoSection from "@/components/VideoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AchievementsSection />
        <StatsSection />
        <TestimonialsSection />
        <VideoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;