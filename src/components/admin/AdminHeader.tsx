
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";

const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
        >
          <Home className="h-4 w-4 mr-2" />
          View Site
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Mohamed Roshdy</p>
            <button 
              onClick={logout}
              className="text-gray-500 hover:text-blue-600 text-xs"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
