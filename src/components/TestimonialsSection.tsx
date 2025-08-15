import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Absolutely amazing work! They transformed our vision into reality with incredible attention to detail. The team was professional, punctual, and exceeded our expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "Outstanding construction services for our new office building. The project was completed on time and within budget. Highly recommend their expertise!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      role: "Property Developer",
      content: "Working with this team has been a game-changer for our development projects. Their quality of work and communication is second to none.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Robert Wilson",
      role: "Restaurant Owner",
      content: "They renovated our restaurant with such precision and care. The space looks incredible and our customers love the new atmosphere!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lisa Thompson",
      role: "Homeowner",
      content: "From kitchen remodeling to full home renovation, they handled everything perfectly. Professional, reliable, and the results speak for themselves.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our construction services.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;