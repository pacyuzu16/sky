import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, User } from "lucide-react";
import { useEffect, useState } from "react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
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
    },
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
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our valued clients across Rwanda about our construction and engineering services.
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
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={`h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-500 transform hover:-translate-y-2 animate-scale-in ${
                      index === currentIndex
                        ? "ring-2 ring-primary/30 shadow-lg"
                        : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mr-4 animate-pulse">
                          <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-sm">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 hover:scale-110 transition-transform" />
            <CarouselNext className="hidden md:flex -right-12 hover:scale-110 transition-transform" />
          </Carousel>
        </div>

        {/* Moving testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
