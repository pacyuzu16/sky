import SEO from "@/components/SEO";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About Us"
        description="Learn about Skyline Consultancy & Engineering — a Rwandan engineering and construction firm building excellence since 2020 with a skilled, certified team."
        path="/about"
      />
      <Header />
      <main className="pt-20">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;