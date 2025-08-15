import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "industrial", label: "Industrial" }
  ];

  const projects = [
    {
      id: 1,
      title: "Modern Office Complex",
      category: "commercial",
      location: "Kigali, Rwanda",
      duration: "18 months",
      team: "25 professionals",
      description: "State-of-the-art office complex featuring sustainable design and modern amenities.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      status: "Completed",
      year: "2023"
    },
    {
      id: 2,
      title: "Luxury Residential Villa",
      category: "residential",
      location: "Nyamirambo, Kigali",
      duration: "12 months",
      team: "15 professionals",
      description: "Elegant residential villa with contemporary architecture and premium finishes.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      status: "Completed",
      year: "2023"
    },
    {
      id: 3,
      title: "Shopping Mall Development",
      category: "commercial",
      location: "Kimisagara, Kigali",
      duration: "24 months",
      team: "40 professionals",
      description: "Large-scale shopping mall with modern retail spaces and entertainment facilities.",
      image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=600&fit=crop",
      status: "In Progress",
      year: "2024"
    },
    {
      id: 4,
      title: "Bridge Infrastructure",
      category: "infrastructure",
      location: "Muhanga, Rwanda",
      duration: "15 months",
      team: "30 professionals",
      description: "Modern bridge construction improving regional connectivity and transportation.",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
      status: "Completed",
      year: "2022"
    },
    {
      id: 5,
      title: "Industrial Warehouse",
      category: "industrial",
      location: "Gasabo, Kigali",
      duration: "10 months",
      team: "20 professionals",
      description: "Large industrial warehouse with advanced logistics and storage capabilities.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      status: "Completed",
      year: "2023"
    },
    {
      id: 6,
      title: "Residential Complex",
      category: "residential",
      location: "Remera, Kigali",
      duration: "20 months",
      team: "35 professionals",
      description: "Multi-family residential complex with modern amenities and green spaces.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      status: "In Progress",
      year: "2024"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Our Portfolio
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our portfolio of successful projects that showcase our expertise in 
            engineering, architecture, and construction across various sectors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-construction transition-all duration-500 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={project.status === "Completed" ? "default" : "secondary"}
                    className={project.status === "Completed" ? "bg-green-500" : "bg-orange-500"}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/80 text-foreground">
                    {project.year}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="outline" className="bg-background/80 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary mr-2" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    {project.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    {project.team}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Badge variant="outline" className="text-xs capitalize">
                    {project.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Want to see more of our work or discuss your project?
          </p>
          <Button 
            size="lg"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;