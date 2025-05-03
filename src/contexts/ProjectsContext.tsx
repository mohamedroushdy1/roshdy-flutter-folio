
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

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
  createdAt: Date;
}

interface ProjectsContextType {
  projects: Project[];
  messages: Message[];
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, project: Partial<Omit<Project, "id" | "createdAt">>) => void;
  deleteProject: (id: string) => void;
  addMessage: (message: Omit<Message, "id" | "read" | "createdAt">) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Sample data for initial demo
const sampleProjects: Project[] = [
  {
    id: "1",
    name: "FlutterChat",
    description: "A real-time messaging app built with Flutter and Firebase, featuring read receipts and media sharing.",
    technologies: ["Flutter", "Dart", "Firebase", "GetX"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    downloadLink: "https://example.com/download",
    featured: true,
    createdAt: new Date(2023, 5, 15)
  },
  {
    id: "2",
    name: "TaskMaster Pro",
    description: "A productivity app with task management, reminders, and synchronization across devices.",
    technologies: ["Flutter", "Dart", "SQLite", "Provider"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    downloadLink: "https://example.com/download",
    featured: false,
    createdAt: new Date(2023, 2, 10)
  },
  {
    id: "3",
    name: "FitTracker",
    description: "A fitness tracking application with workout plans, progress tracking, and health metrics.",
    technologies: ["Flutter", "Dart", "Hive", "Bloc"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    downloadLink: "https://example.com/download",
    featured: true,
    createdAt: new Date(2023, 8, 22)
  }
];

const sampleMessages: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    content: "Hi, I'm interested in hiring you for a Flutter project. Can we discuss details?",
    read: false,
    createdAt: new Date(2023, 9, 25)
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    content: "I saw your TaskMaster app and was wondering if you're available for freelance work.",
    read: true,
    createdAt: new Date(2023, 9, 20)
  }
];

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : sampleProjects;
  });
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : sampleMessages;
  });

  // Update localStorage when projects or messages change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProjects([...projects, newProject]);
    toast({
      title: "Project added",
      description: `${project.name} has been added to your portfolio.`,
    });
  };

  const updateProject = (id: string, project: Partial<Omit<Project, "id" | "createdAt">>) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, ...project } : p
    ));
    toast({
      title: "Project updated",
      description: `The project has been updated successfully.`,
    });
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Project deleted",
      description: `The project has been removed from your portfolio.`,
    });
  };

  const addMessage = (message: Omit<Message, "id" | "read" | "createdAt">) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date()
    };
    setMessages([...messages, newMessage]);
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully!",
    });
  };

  const markMessageAsRead = (id: string) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been deleted.",
    });
  };

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      messages, 
      addProject, 
      updateProject, 
      deleteProject, 
      addMessage, 
      markMessageAsRead, 
      deleteMessage 
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
