
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-blue-500">Flutter</span> Developer <br />
              Building Beautiful <br />
              Mobile Experiences
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Hi, I'm Mohamed Roshdy. I craft elegant, high-performance mobile applications 
              with Flutter and Dart that users love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600"
                onClick={scrollToProjects}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-500 hover:bg-blue-50"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full opacity-10 absolute -top-10 -right-10"></div>
            <div className="w-full aspect-square max-w-md mx-auto relative overflow-hidden rounded-3xl shadow-2xl border-8 border-white">
              <img 
                src="/placeholder.svg"
                alt="Mohamed Roshdy - Flutter Developer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <a 
            href="#about" 
            className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition-colors"
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
