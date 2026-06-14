import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Services"
        description="Explore Skyline's services: architectural design, structural design, building construction, civil engineering supervision, interior design and land surveying in Rwanda."
        path="/services"
      />
      <Header />
      <main className="pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;