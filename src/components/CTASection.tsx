import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Ready to Build Your <span className="text-primary">Vision</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Let's transform your ideas into reality with our expert engineering solutions. 
            Contact us today for a free consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/contact")}
              className="bg-gradient-primary text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-4 text-lg shadow-elegant group"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg group"
              onClick={() => window.open("tel:+250788447022")}
            >
              <Phone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Call Now
            </Button>
          </div>

          <div className="mt-12 p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Quick Response</h4>
                <p className="text-sm text-muted-foreground">24-hour consultation scheduling</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Expert Team</h4>
                <p className="text-sm text-muted-foreground">Certified professional engineers</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Quality Guarantee</h4>
                <p className="text-sm text-muted-foreground">100% satisfaction commitment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;