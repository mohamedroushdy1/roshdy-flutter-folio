
import { useState } from "react";
import { Download } from "lucide-react";
import { Project } from "@/contexts/ProjectsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
      style={{ 
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video">
        <Carousel className="w-full">
          <CarouselContent>
            {project.images.map((image, i) => (
              <CarouselItem key={i}>
                <div className="p-1 h-full">
                  <img 
                    src={image} 
                    alt={`${project.name} screenshot ${i + 1}`} 
                    className="w-full aspect-video object-cover rounded-t-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={isHovered ? "opacity-100" : "opacity-0"} />
          <CarouselNext className={isHovered ? "opacity-100" : "opacity-0"} />
        </Carousel>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-xl">{project.name}</h3>
          {project.featured && (
            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">Featured</span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="tech-pill"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <Button asChild className="w-full">
          <a href={project.downloadLink} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download App
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
