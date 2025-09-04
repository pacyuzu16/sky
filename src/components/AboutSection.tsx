import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Clock, 
  Shield, 
  Target, 
  Heart,
  CheckCircle,
  Star
} from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "We never compromise on quality, ensuring every project meets the highest standards of excellence."
    },
    {
      icon: Heart,
      title: "Client Focus",
      description: "Our clients' success is our success. We build lasting relationships through exceptional service."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and innovative solutions to deliver superior results."
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Our collaborative approach brings together diverse expertise to achieve outstanding outcomes."
    }
  ];

  const achievements = [
    { number: "500+", label: "Projects Completed", icon: Award },
    { number: "15+", label: "Years of Experience", icon: Clock },
    { number: "100%", label: "Client Satisfaction", icon: Star },
    { number: "50+", label: "Expert Team Members", icon: Users }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "ISO 14001:2015 Environmental Management",
    "OHSAS 18001 Occupational Health & Safety",
    "Rwanda Engineers Board Certified",
    "Green Building Council Member"
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            About Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Building Excellence Since 2008
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Skyline Consultancy & Engineering has been at the forefront of Rwanda's construction 
            and engineering industry, delivering innovative solutions that shape the future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Story */}
          <div className="animate-fade-in-left">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Our Mission & Vision
            </h3>
            <div className="space-y-6">
              <div className="bg-gradient-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <h4 className="text-xl font-semibold text-foreground mb-3">Mission</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Ambition to offer excellent services to our clients by providing innovative and 
                  sustainable solutions in construction industry. We are committed to delivering 
                  projects that exceed expectations while maintaining the highest standards of quality and safety.
                </p>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                <h4 className="text-xl font-semibold text-foreground mb-3">Vision</h4>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading engineering consultancy in East Africa, recognized for our 
                  innovative approach, sustainable practices, and unwavering commitment to excellence 
                  in every project we undertake.
                </p>
              </div>

              <div className="pt-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">Why Choose Us?</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Experienced team of certified professionals",
                    "Cutting-edge technology and methodologies",
                    "Commitment to sustainable construction practices",
                    "Proven track record of successful projects",
                    "Comprehensive project management approach"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-bold text-foreground mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-construction transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div 
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <IconComponent className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {achievement.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-background rounded-2xl p-8 lg:p-12 shadow-construction">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Certifications & Compliance
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest industry standards through rigorous certifications 
              and continuous compliance with international best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center p-4 bg-muted/50 rounded-lg hover:bg-primary/5 transition-colors duration-300"
              >
                <div className="w-3 h-3 bg-gradient-primary rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-foreground font-medium">{cert}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
  size="lg"
  onClick={() => {
    // Navigate to Contact page navigate("/contact");

    // Use a small delay to scroll after route change
    setTimeout(() => {
      const element = document.getElementById("contact-section");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }}
>
  Partner With Us
</Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;