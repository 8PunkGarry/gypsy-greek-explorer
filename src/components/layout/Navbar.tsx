
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { Menu, X, BookOpen, Map, Compass, LayoutTemplate, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { path: '/history', label: t('history'), icon: BookOpen },
    { path: '/geography', label: t('geography'), icon: Map },
    { path: '/culture', label: t('culture'), icon: Compass },
    { path: '/politics', label: t('politics'), icon: LayoutTemplate },
    { path: '/practice', label: t('practice'), icon: CheckSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-glow">
              G
            </div>
            <span className="font-heading font-semibold text-xl text-gray-900">GreekSpark</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <UserAuthDialog />
            <Button 
              asChild 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/practice">
                {t('startLearning')}
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  isActive(link.path) 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <LanguageSelector />
              <UserAuthDialog />
            </div>
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
            >
              <Link to="/practice" onClick={() => setMobileMenuOpen(false)}>
                {t('startLearning')}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
