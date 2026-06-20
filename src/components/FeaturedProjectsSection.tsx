import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { projects } from "@/data/projects";

const FeaturedProjectsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Our Portfolio
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A glimpse of the work we're proud of — swipe through our latest builds.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/projects")}
            className="self-start md:self-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group whitespace-nowrap"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Horizontal Scroll Carousel */}
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <Card
                  className="group overflow-hidden h-full cursor-pointer hover:shadow-construction transition-all duration-500 hover:-translate-y-2"
                  onClick={() => navigate("/projects")}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                    <Badge
                      className={`absolute top-4 left-4 ${
                        project.status === "Completed" ? "bg-green-500" : "bg-orange-500"
                      }`}
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="absolute top-4 right-4 bg-background/80 text-foreground">
                      {project.year}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary mr-2 shrink-0" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary mr-2 shrink-0" />
                        {project.duration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
