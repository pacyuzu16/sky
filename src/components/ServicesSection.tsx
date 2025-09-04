import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  Building, 
  Hammer, 
  ShieldCheck, 
  Palette, 
  MapPin, 
  Building2, 
  ClipboardList
} from "lucide-react";
import { useState } from "react";

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Compass,
      title: "Architectural Design",
      description: "Innovative and sustainable architectural solutions that blend creativity with functionality to create stunning structures.",
      features: ["3D Modeling", "Sustainable Design", "Modern Architecture", "Space Planning"],
      color: "text-blue-500"
    },
    {
      icon: Building,
      title: "Structural Design",
      description: "Robust structural engineering designs ensuring safety, durability, and compliance with all building codes.",
      features: ["Load Analysis", "Foundation Design", "Steel Structures", "Concrete Design"],
      color: "text-green-500"
    },
    {
      icon: Hammer,
      title: "Construction of Building",
      description: "Complete construction services from foundation to finishing, delivering high-quality buildings on time.",
      features: ["Project Management", "Quality Control", "Timeline Adherence", "Safety Standards"],
      color: "text-orange-500"
    },
    {
      icon: ShieldCheck,
      title: "Civil Engineering Supervision",
      description: "Professional supervision ensuring projects meet technical specifications and quality standards.",
      features: ["Site Inspection", "Quality Assurance", "Progress Monitoring", "Compliance Checks"],
      color: "text-purple-500"
    },
    {
      icon: Palette,
      title: "Interior Design",
      description: "Creating beautiful, functional interior spaces that reflect your style and enhance your lifestyle.",
      features: ["Space Design", "Material Selection", "Lighting Design", "Custom Solutions"],
      color: "text-pink-500"
    },
    {
      icon: MapPin,
      title: "Land Surveying",
      description: "Precise land surveying services using advanced technology for accurate property boundary determination.",
      features: ["Topographic Survey", "Boundary Survey", "GPS Technology", "Legal Documentation"],
      color: "text-indigo-500"
    },
    {
      icon: Building2,
      title: "Property Services",
      description: "Comprehensive property services including buying, selling, and rental management solutions.",
      features: ["Property Valuation", "Market Analysis", "Legal Support", "Investment Advice"],
      color: "text-red-500"
    },
    {
      icon: ClipboardList,
      title: "Project Planning",
      description: "Strategic project planning and management to ensure successful completion within budget and timeline.",
      features: ["Cost Estimation", "Resource Planning", "Risk Assessment", "Timeline Management"],
      color: "text-teal-500"
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            From concept to completion, we provide end-to-end engineering and construction services 
            tailored to meet your specific needs and exceed your expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-construction transform hover:-translate-y-2 ${
                  hoveredService === index ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex items-center text-xs text-muted-foreground transition-all duration-300 ${
                            hoveredService === index ? "text-primary" : ""
                          }`}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-60"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className={`absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`}></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 animate-fade-in-up px-4">
          <div className="bg-gradient-primary rounded-2xl p-6 sm:p-8 lg:p-12 text-center shadow-elegant">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and turn it into reality with our expert engineering solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-background text-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-background/90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Get Free Consultation
              </button>
              <button 
                onClick={() => window.location.href = '/projects'}
                className="border-2 border-primary-foreground text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-all duration-300 text-sm sm:text-base"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;