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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Plus, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useProjects();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technologies: [""],
    images: [""],
    downloadLink: "",
    featured: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileUpload = async (index: number, file: File) => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Set initial progress
      setUploadProgress(prev => ({
        ...prev,
        [index]: 0
      }));
      
      // Create a custom upload function to track progress
      const trackProgress = () => {
        // This is a workaround since onUploadProgress is not available
        // We'll update progress at fixed intervals to simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress > 90) {
            clearInterval(interval);
          }
          setUploadProgress(prev => ({
            ...prev,
            [index]: progress
          }));
        }, 200);
        
        return () => clearInterval(interval);
      };
      
      // Start tracking progress
      const stopTracking = trackProgress();
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('project_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      // Stop tracking progress once upload is complete
      stopTracking();
      
      if (error) {
        throw error;
      }
      
      // Set progress to 100%
      setUploadProgress(prev => ({
        ...prev,
        [index]: 100
      }));
      
      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('project_images')
        .getPublicUrl(filePath);
      
      // Update image URL in form data
      handleImageChange(index, publicUrl);
      
      toast({
        title: "Upload successful",
        description: "Image has been uploaded successfully",
      });
      
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(prev => ({
          ...prev,
          [index]: 0
        }));
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.description || !formData.downloadLink) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Filter out empty technologies
    const filteredTechnologies = formData.technologies.filter(tech => tech.trim() !== "");
    
    // Filter out empty images
    const filteredImages = formData.images.filter(img => img.trim() !== "");
    
    if (filteredImages.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one image",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "An error occurred while saving the project",
        variant: "destructive",
      });
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
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Image URL"
                      className="flex-1"
                    />
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" size="icon" className="shrink-0">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Image</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                          <Image className="h-10 w-10 text-gray-400 mb-4" />
                          <p className="text-sm text-gray-500 mb-2">Click to select or drag and drop</p>
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(index, file);
                              }
                            }}
                          />
                          {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                            <div className="w-full mt-4">
                              <div className="bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-blue-600 h-2.5 rounded-full" 
                                  style={{width: `${uploadProgress[index]}%`}}
                                ></div>
                              </div>
                              <p className="text-xs text-center mt-1">{uploadProgress[index]}%</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {formData.images.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {img && (
                    <div className="relative h-32 w-full overflow-hidden rounded border border-gray-200">
                      <img 
                        src={img} 
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
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
            <Button 
              type="submit" 
              disabled={isSubmitting || isUploading}
            >
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
