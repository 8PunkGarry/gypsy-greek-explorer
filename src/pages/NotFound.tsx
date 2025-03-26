
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurBackground from "@/components/ui/BlurBackground";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-greek-blue/20 flex items-center justify-center text-greek-darkBlue mx-auto mb-6">
            <FileQuestion size={36} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-gray-900 mb-6">
            Страница не найдена
          </h1>
          
          <p className="text-xl text-gray-600 max-w-xl mx-auto mb-10">
            К сожалению, запрашиваемая страница в настоящее время находится в разработке или не существует.
          </p>
          
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-greek-darkBlue text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Вернуться на главную
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
