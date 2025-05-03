
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">MR</span>
          <span className="hidden md:inline-block text-lg font-medium">
            Mohamed Roshdy
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/#about"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/#projects"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/#contact"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/dashboard">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/login">
                <LogIn className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4 animate-fade-in">
          <Link
            to="/#about"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/#projects"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/#contact"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
