
import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import { useProjects } from "@/contexts/ProjectsContext";

const HomePage = () => {
  const { projects } = useProjects();

  useEffect(() => {
    // Scroll to section if hash is present in URL
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="pt-16">
      <Hero />
      <About />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
};

export default HomePage;
