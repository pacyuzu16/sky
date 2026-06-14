import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Us"
        description="Contact Skyline Consultancy & Engineering in Kigali, Rwanda. Call +250 788 447 022 or email skylineconsengi@gmail.com for a free consultation and project quote."
        path="/contact"
      />
      <Header />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;