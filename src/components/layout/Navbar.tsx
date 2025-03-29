
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import LanguageSelector from '@/components/ui/LanguageSelector';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="bg-[#1E2532]/80 backdrop-blur-md border-b border-gray-800/30 py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="w-7 h-7 mr-2" />
            <span className="font-heading font-medium text-lg text-blue-300">Greek Citizenship</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/history" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">
              {t('history')}
            </Link>
            <Link to="/geography" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">
              {t('geography')}
            </Link>
            <Link to="/culture" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">
              {t('culture')}
            </Link>
            <Link to="/politics" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">
              {t('politics')}
            </Link>
            <Link to="/practice" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">
              {t('practice')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <UserAuthDialog />
            <Button asChild size="sm" className="bg-blue-600/80 hover:bg-blue-700 text-white text-sm">
              <Link to="/practice">
                {t('practice')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
