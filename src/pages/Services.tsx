import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;