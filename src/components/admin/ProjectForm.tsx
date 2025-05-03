
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects, Project } from "@/contexts/ProjectsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { X, Plus } from "lucide-react";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useProjects();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technologies: [""],
    images: ["", ""],
    downloadLink: "",
    featured: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setFormData({
          name: project.name,
          description: project.description,
          technologies: [...project.technologies],
          images: [...project.images],
          downloadLink: project.downloadLink,
          featured: project.featured,
        });
      }
    }
  }, [id, projects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData(prev => ({
      ...prev,
      technologies: newTechnologies
    }));
  };

  const handleAddTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, ""]
    }));
  };

  const handleRemoveTechnology = (index: number) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      technologies: newTechnologies
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ""]
    }));
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.description || !formData.downloadLink) {
      alert("Please fill out all required fields");
      setIsSubmitting(false);
      return;
    }

    // Filter out empty technologies
    const filteredTechnologies = formData.technologies.filter(tech => tech.trim() !== "");
    
    // Filter out empty images
    const filteredImages = formData.images.filter(img => img.trim() !== "");
    
    if (filteredImages.length === 0) {
      alert("Please add at least one image");
      setIsSubmitting(false);
      return;
    }

    try {
      const projectData = {
        ...formData,
        technologies: filteredTechnologies,
        images: filteredImages,
      };

      if (id) {
        updateProject(id, projectData);
      } else {
        addProject(projectData);
      }
      
      navigate("/admin/dashboard/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("An error occurred while saving the project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {id ? "Edit Project" : "Add New Project"}
        </h1>
        <Button variant="outline" onClick={() => navigate("/admin/dashboard/projects")}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project"
                rows={5}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Technologies</Label>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  onClick={handleAddTechnology}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Technology
                </Button>
              </div>
              
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    placeholder={`Technology ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.technologies.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTechnology(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Project Images *</Label>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  onClick={handleAddImage}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Image
                </Button>
              </div>
              
              {formData.images.map((img, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL (e.g., /placeholder.svg)"
                    className="flex-1"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-sm text-gray-500">
                For demo purposes, you can use "/placeholder.svg" for images
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="downloadLink">Download Link *</Label>
              <Input
                id="downloadLink"
                name="downloadLink"
                value={formData.downloadLink}
                onChange={handleChange}
                placeholder="Enter app download link"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard/projects")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : id
                ? "Update Project"
                : "Add Project"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProjectForm;
