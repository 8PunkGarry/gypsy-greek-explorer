
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Map, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E2532] border-t border-gray-800/30 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 rounded-md bg-blue-900/30 text-blue-300 flex items-center justify-center font-heading font-medium text-lg mr-3">
                G
              </div>
              <span className="font-heading font-medium text-lg text-gray-100">GreekSpark</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              Погружение в греческую культуру и историю. Подготовка к собеседованию на греческое гражданство.
            </p>
            
            <div className="flex space-x-3">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="twitter" />
              <SocialIcon icon="instagram" />
              <SocialIcon icon="youtube" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4 text-gray-200">Разделы</h4>
            <ul className="space-y-2">
              <FooterLink href="/history" label="История Греции" />
              <FooterLink href="/geography" label="География Греции" />
              <FooterLink href="/culture" label="Культура Греции" />
              <FooterLink href="/politics" label="Политическое устройство" />
              <FooterLink href="/interview" label="Симулятор собеседования" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4 text-gray-200">Ресурсы</h4>
            <ul className="space-y-2">
              <FooterLink href="/faq" label="Часто задаваемые вопросы" />
              <FooterLink href="/blog" label="Блог" />
              <FooterLink href="/testimonials" label="Истории успеха" />
              <FooterLink href="/terms" label="Условия использования" />
              <FooterLink href="/privacy" label="Политика конфиденциальности" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4 text-gray-200">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={16} className="text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400 text-sm">support@greekspark.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400 text-sm">+30 210 123 4567</span>
              </li>
              <li className="flex items-start">
                <Map size={16} className="text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400 text-sm">Афины, Греция</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800/40 text-center text-gray-500 text-xs">
          <p className="flex items-center justify-center">
            Создано с <Heart size={12} className="text-red-500 mx-1 inline" /> для поддержки тех, кто стремится стать гражданином Греции
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} GreekSpark. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-gray-400 text-sm hover:text-blue-300 transition-colors duration-300"
      >
        {label}
      </Link>
    </li>
  );
};

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <a 
      href={`https://${icon}.com`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-blue-900/30 hover:text-blue-300 transition-colors duration-300"
    >
      <i className={`fab fa-${icon}`}></i>
      {/* Simple placeholder for social icons */}
      {icon.charAt(0).toUpperCase()}
    </a>
  );
};

export default Footer;
