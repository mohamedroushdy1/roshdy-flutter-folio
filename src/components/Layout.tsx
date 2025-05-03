
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const isAdmin = window.location.pathname.startsWith("/admin");
  
  // Don't show navbar and footer on admin pages (except login)
  const showNavFooter = !isAdmin || window.location.pathname === "/admin/login";

  return (
    <div className="flex flex-col min-h-screen">
      {showNavFooter && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {showNavFooter && <Footer />}
    </div>
  );
};

export default Layout;
