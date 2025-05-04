
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  downloadLink: string;
  featured: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  read: boolean;
  created_at: Date;
}

interface ProjectsContextType {
  projects: Project[];
  messages: Message[];
  addProject: (project: Omit<Project, "id" | "createdAt">) => Promise<void>;
  updateProject: (id: string, project: Partial<Omit<Project, "id" | "createdAt">>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, "id" | "read" | "createdAt">) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading projects",
        description: error.message,
      });
      return;
    }
    setProjects(data || []);
  };

  const loadMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*');
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading messages",
        description: error.message,
      });
      return;
    }
    setMessages(data || []);
  };

  const value: ProjectsContextType = {
    projects,
    messages,
    addProject: async (project) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...project, createdAt: new Date() }])
        .select()
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error adding project",
          description: error.message,
        });
        return;
      }

      setProjects([...projects, data]);
      toast({
        title: "Project added",
        description: `${project.name} has been added to your portfolio.`,
      });
    },
    updateProject: async (id, project) => {
      const { error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating project",
          description: error.message,
        });
        return;
      }

      setProjects(projects.map(p => p.id === id ? { ...p, ...project } : p));
      toast({
        title: "Project updated",
        description: "The project has been updated successfully.",
      });
    },
    deleteProject: async (id) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error deleting project",
          description: error.message,
        });
        return;
      }

      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Project deleted",
        description: "The project has been removed from your portfolio.",
      });
    },
    addMessage: async (message) => {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ ...message, read: false, created_at: new Date() }])
        .select()
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error sending message",
          description: error.message,
        });
        return;
      }

      setMessages([...messages, data]);
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully!",
      });
    },
    markMessageAsRead: async (id) => {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating message",
          description: error.message,
        });
        return;
      }

      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    },
    deleteMessage: async (id) => {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error deleting message",
          description: error.message,
        });
        return;
      }

      setMessages(messages.filter(m => m.id !== id));
      toast({
        title: "Message deleted",
        description: "The message has been deleted.",
      });
    }
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
