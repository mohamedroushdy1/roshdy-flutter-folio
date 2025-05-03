
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes we're using a hardcoded admin credential
      // In a real app, this would validate against a backend
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("auth_token", "demo_token");
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome back, Mohamed!",
        });
        return true;
      }
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
      return false;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred. Please try again.",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
