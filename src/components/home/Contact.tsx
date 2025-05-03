
import { useState } from "react";
import { useProjects } from "@/contexts/ProjectsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { addMessage } = useProjects();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields");
      setIsSubmitting(false);
      return;
    }
    
    // Add message to context
    addMessage({
      name: formData.name,
      email: formData.email,
      content: formData.message,
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project idea or just want to say hello? Feel free to reach out to me!
            I'm always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-gray-600">contact@mohamedroshdy.com</p>
                <a href="mailto:contact@mohamedroshdy.com" className="text-blue-500 hover:text-blue-700">
                  Send an email
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-gray-600">+123 456 7890</p>
                <a href="tel:+1234567890" className="text-blue-500 hover:text-blue-700">
                  Call me
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Location</h3>
                <p className="text-gray-600">Cairo, Egypt</p>
                <p className="text-gray-500">Available for remote work worldwide</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
