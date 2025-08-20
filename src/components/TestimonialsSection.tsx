import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, User } from "lucide-react"; // Add User icon import

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jean Bosco Niyonzima",
      role: "Homeowner, Kigali",
      content: "Skyline Construction renovated our house in Kicukiro. The team was respectful, finished on time, and the quality is excellent. My family is very happy with the results.",
      rating: 5,
    },
    {
      name: "Aline Uwase",
      role: "Coffee Shop Owner, Musanze",
      content: "They built my coffee shop from scratch. The process was smooth, and they listened to all my ideas. Customers love the new space!",
      rating: 5,
    },
    {
      name: "Eric Mugisha",
      role: "Apartment Manager, Remera",
      content: "Professional and reliable. Skyline handled our apartment block renovation with great attention to detail. Highly recommended for property managers.",
      rating: 5,
    },
    {
      name: "Chantal Ingabire",
      role: "School Director, Huye",
      content: "Our school needed new classrooms. Skyline delivered quality work and kept us informed throughout. The children love their new learning environment.",
      rating: 5,
    },
    {
      name: "Patrick Habimana",
      role: "Restaurant Owner, Rubavu",
      content: "They transformed my restaurant with a beautiful terrace. The team was friendly and the project was affordable. I will work with them again.",
      rating: 5,
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
                        <User className="w-12 h-12 rounded-full bg-muted text-muted-foreground mr-4 p-2" /> {/* Profile icon */}
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