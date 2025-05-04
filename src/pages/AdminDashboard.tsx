
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProjectsList from "@/components/admin/ProjectsList";
import ProjectForm from "@/components/admin/ProjectForm";
import MessagesList from "@/components/admin/MessagesList";
import AccountSettings from "@/components/admin/AccountSettings";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/edit/:id" element={<ProjectForm />} />
            <Route path="/messages" element={<MessagesList />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
