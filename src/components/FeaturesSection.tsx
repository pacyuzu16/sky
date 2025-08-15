import { useNavigate } from "react-router-dom";
import { Building2, Cog, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: "Expert Engineering",
      description: "Professional structural and civil engineering solutions with cutting-edge design.",
      link: "/services"
    },
    {
      icon: Cog,
      title: "Advanced Technology",
      description: "State-of-the-art tools and methodologies for precise project execution.",
      link: "/projects"
    },
    {
      icon: Users,
      title: "Experienced Team",
      description: "Skilled professionals with decades of combined experience in construction.",
      link: "/about"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Certified processes ensuring the highest standards in every project.",
      link: "/contact"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Skyline</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We deliver exceptional engineering solutions that exceed expectations and stand the test of time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/50"
              onClick={() => navigate(feature.link)}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            onClick={() => navigate("/services")}
            className="bg-gradient-primary text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-3 text-lg shadow-elegant"
          >
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;