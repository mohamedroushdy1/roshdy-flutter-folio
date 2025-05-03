
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-blue-600">MR</span>
              <span className="text-xl font-medium">Mohamed Roshdy</span>
            </Link>
            <p className="mt-2 text-gray-600 max-w-md">
              Flutter developer focused on building beautiful and functional mobile applications.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="mailto:contact@mohamedroshdy.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {currentYear} Mohamed Roshdy. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link to="/#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/#projects" className="text-gray-600 hover:text-blue-600 transition-colors">Projects</Link>
            <Link to="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
