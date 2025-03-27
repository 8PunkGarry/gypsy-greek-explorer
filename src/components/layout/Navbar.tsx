
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="w-8 h-8 mr-2" />
            <span className="font-heading font-semibold text-xl text-greek-darkBlue">Greek Citizenship</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/history" className="text-gray-700 hover:text-greek-darkBlue transition-colors">
              История
            </Link>
            <Link to="/geography" className="text-gray-700 hover:text-greek-darkBlue transition-colors">
              География
            </Link>
            <Link to="/culture" className="text-gray-700 hover:text-greek-darkBlue transition-colors">
              Культура
            </Link>
            <Link to="/politics" className="text-gray-700 hover:text-greek-darkBlue transition-colors">
              Политика
            </Link>
            <Link to="/practice" className="text-gray-700 hover:text-greek-darkBlue transition-colors">
              Практика
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <UserAuthDialog />
            <Button asChild size="sm" className="bg-greek-darkBlue hover:bg-greek-blue/90 text-white">
              <Link to="/practice">
                Практика
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
