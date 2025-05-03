
import { CheckCircle } from "lucide-react";

const About = () => {
  const skills = [
    "Flutter & Dart",
    "UI/UX Design",
    "REST API Integration",
    "Firebase",
    "State Management (Provider, Bloc, GetX)",
    "Responsive Design",
    "HTML, CSS & JavaScript",
    "Git & GitHub"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/placeholder.svg"
                alt="Mohamed Roshdy" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-blue-500 rounded-full opacity-10"></div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-bold">Hi, I'm Mohamed Roshdy</h3>
            <p className="text-gray-700 text-lg">
              I'm a passionate Flutter developer with expertise in creating beautiful, 
              high-performance mobile applications. With a strong foundation in Dart 
              and a keen eye for design, I specialize in turning complex ideas into 
              intuitive and elegant mobile experiences.
            </p>
            <p className="text-gray-700 text-lg">
              My journey in mobile development began with native Android development, 
              but I quickly fell in love with Flutter's expressive UI framework and 
              hot reload capabilities. Today, I leverage Flutter to build cross-platform 
              apps that feel truly native on both iOS and Android.
            </p>
            
            <div className="pt-4">
              <h4 className="font-bold text-xl mb-4">Skills & Expertise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
