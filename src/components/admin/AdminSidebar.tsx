
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderPlus, MessageSquare, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects",
      path: "/admin/dashboard/projects",
      icon: <FolderPlus className="h-5 w-5" />,
    },
    {
      title: "Messages",
      path: "/admin/dashboard/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Mohamed Roshdy</h1>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
