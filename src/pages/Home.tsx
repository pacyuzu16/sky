import SEO from "@/components/SEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoSection from "@/components/VideoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Skyline Consultancy & Engineering — Construction & Engineering in Rwanda"
        description="Skyline Consultancy & Engineering delivers expert architectural design, structural engineering, construction and civil engineering supervision across Rwanda. Quality is our first priority."
        path="/"
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
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