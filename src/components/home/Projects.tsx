
import { useState } from "react";
import { Project } from "@/contexts/ProjectsContext";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my portfolio of mobile applications built with Flutter and Dart. 
            Each project demonstrates my commitment to quality, performance, and user experience.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "featured"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Featured
            </button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
