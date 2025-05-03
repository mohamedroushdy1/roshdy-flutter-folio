
import { useProjects } from "@/contexts/ProjectsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderPlus, MessageSquare, Eye, Clock } from "lucide-react";

const DashboardOverview = () => {
  const { projects, messages } = useProjects();
  
  const unreadMessages = messages.filter(message => !message.read).length;
  const featuredProjects = projects.filter(project => project.featured).length;
  
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const recentMessages = messages
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FolderPlus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Featured Projects</p>
              <p className="text-2xl font-bold">{featuredProjects}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Messages</p>
              <p className="text-2xl font-bold">{messages.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Unread Messages</p>
              <p className="text-2xl font-bold">{unreadMessages}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map(message => (
                  <div key={message.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium">{message.name}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(new Date(message.createdAt))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{message.email}</div>
                    <div className="text-sm line-clamp-2">{message.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No messages yet
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              asChild
              className="w-full flex justify-between items-center"
            >
              <Link to="/admin/dashboard/projects/new">
                <span>Add New Project</span>
                <FolderPlus className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="w-full flex justify-between items-center"
            >
              <Link to="/admin/dashboard/messages">
                <span>View All Messages</span>
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// We need to add the missing imports
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default DashboardOverview;
