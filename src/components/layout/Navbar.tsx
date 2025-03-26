
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleStartLearning = () => {
    navigate('/history');
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-greek-darkBlue text-white flex items-center justify-center font-heading font-bold text-xl mr-3">
            G
          </div>
          <span className="font-heading font-semibold text-xl text-gray-900">GreekSpark</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" label="Главная" />
          <NavLink href="/history" label="История" />
          <NavLink href="/geography" label="География" />
          <NavLink href="/culture" label="Культура" />
          <NavLink href="/politics" label="Политика" />
          
          <button 
            className="ml-4 px-5 py-2 rounded-full bg-greek-darkBlue text-white text-sm font-medium hover:bg-opacity-90 transition-colors duration-300"
            onClick={handleStartLearning}
          >
            Начать обучение
          </button>
        </nav>
        
        <button 
          className="md:hidden text-gray-700 hover:text-gray-900 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="container mx-auto px-4 py-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-greek-darkBlue text-white flex items-center justify-center font-heading font-bold text-xl mr-3">
                G
              </div>
              <span className="font-heading font-semibold text-xl text-gray-900">GreekSpark</span>
            </Link>
            
            <button 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            <MobileNavLink href="/" label="Главная" onClick={toggleMobileMenu} />
            <MobileNavLink href="/history" label="История" onClick={toggleMobileMenu} />
            <MobileNavLink href="/geography" label="География" onClick={toggleMobileMenu} />
            <MobileNavLink href="/culture" label="Культура" onClick={toggleMobileMenu} />
            <MobileNavLink href="/politics" label="Политика" onClick={toggleMobileMenu} />
          </nav>
          
          <div className="mt-auto mb-10">
            <button 
              className="w-full py-3 rounded-lg bg-greek-darkBlue text-white font-medium hover:bg-opacity-90 transition-colors duration-300"
              onClick={handleStartLearning}
            >
              Начать обучение
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <Link 
      to={href} 
      className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-greek-darkBlue after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100"
    >
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<{ href: string; label: string; onClick?: () => void }> = ({ 
  href, 
  label,
  onClick 
}) => {
  return (
    <Link 
      to={href} 
      className="text-2xl font-heading font-medium text-gray-900"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
