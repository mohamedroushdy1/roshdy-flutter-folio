
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectsContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FolderPlus, Edit2, Trash2, Star, StarOff } from "lucide-react";

const ProjectsList = () => {
  const { projects, updateProject, deleteProject } = useProjects();
  const navigate = useNavigate();

  const toggleFeatured = (id: string, featured: boolean) => {
    updateProject(id, { featured: !featured });
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => navigate("/admin/dashboard/projects/new")}>
          <FolderPlus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No projects yet. Create your first project!
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Technologies</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Featured</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b last:border-b-0">
                      <td className="px-4 py-4 font-medium">{project.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="tech-pill">{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="tech-pill">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {formatDate(new Date(project.createdAt))}
                      </td>
                      <td className="px-4 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(project.id, project.featured)}
                          className={project.featured ? "text-yellow-500" : "text-gray-400"}
                        >
                          {project.featured ? (
                            <Star className="h-5 w-5 fill-yellow-500" />
                          ) : (
                            <StarOff className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {project.featured ? "Unfeature" : "Feature"}
                          </span>
                        </Button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/dashboard/projects/edit/${project.id}`)}
                          >
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{project.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteProject(project.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsList;
