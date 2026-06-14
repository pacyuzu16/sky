import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Projects"
        description="See Skyline Consultancy & Engineering's portfolio of completed and ongoing residential, commercial and infrastructure projects across Rwanda."
        path="/projects"
      />
      <Header />
      <main className="pt-20">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;